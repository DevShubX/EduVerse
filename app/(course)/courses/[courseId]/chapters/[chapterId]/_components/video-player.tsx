'use client'
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';
import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface VideoPlayerProps{
    playbackId : string,
    courseId : string,
    chapterId : string,
    nextChapterId? : string,
    isLocked : boolean,
    completeOnEnd : boolean,
    title : string,
}


const VideoPlayer = ({chapterId,completeOnEnd,courseId,isLocked,nextChapterId,playbackId,title}:VideoPlayerProps) => {

    const [isReady,setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async()=>{
        try{
            if(completeOnEnd){
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                    isCompleted:true,
                });

                if(!nextChapterId){
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if(nextChapterId){
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }
            }
        }catch(error){
            toast.error("Something went wrong");
        }
    }

  return (
    <div className='relative aspect-video'>
        {!isLocked && (
            <div className='absolute inset-0 flex items-center justify-center bg-slate-800'>
                <Loader2 className='h-8 w-8 animate-spin text-secondary'/>
            </div>
        )}
        {isLocked && (
            <div className='absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary'>
                <Lock className='h-8 w-8'/>
                <p className='text-sm'>
                    This chapter is locked
                </p>
            </div>
        )}
        {!isLocked && (
            <MuxPlayer
                title={title}
                playbackId={playbackId}
                className={cn(
                    !isReady && "hidden"
                )}
                onCanPlay={()=>setIsReady(true)}
                onEnded={onEnd}
            />
        )}
    </div>
  )
}

export default VideoPlayer