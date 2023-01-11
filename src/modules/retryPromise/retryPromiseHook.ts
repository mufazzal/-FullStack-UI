import { useEffect, useRef, useState } from 'react';

export interface RetrialStateInfo {
    stage: string,
    attempCounter: number,
    nextTryDelay?: number 
}
function useRetryPromise(
        callback: (data: any)=>Promise<any>, 
        onFail: (fail: any, getInfoObj: RetrialStateInfo)=>boolean, 
        onResolve: (res: any, getInfoObj: RetrialStateInfo)=>void, 
        onReject: (rej: any, getInfoObj: RetrialStateInfo)=>void, 
        maxRetry: number, 
        backOffOptions: any) : [(data: any)=>void, ()=>void] {

    const attempCounter = useRef<any>(0);
    const timeoutHandler = useRef<any>(0);
    const currentStage = useRef<string>('STOPED_UNRUN') // ABORT_MANUAL | ABORT_UNMOUNTED | STOPED_FAILED | STARTED_FAILED_RETRY | STOPED_SUCCESS | STOPED_ABORTED_RETRY | STOPED_UNRUN | STARTED 

    useEffect(() => {
        return () => {
            if(currentStage.current === "STARTED_FAILED_RETRY" || currentStage.current === "STARTED") {
                clearTimeout(timeoutHandler.current)
                currentStage.current = "ABORT_UNMOUNTED"
                onReject('', getInfoObj())
            }
        }
    }, [])

    function getNextDelay() {
        if(backOffOptions.type === 'fix') {
            return backOffOptions.interval
        } else if(backOffOptions.type === 'linear') {
            return attempCounter.current * backOffOptions.factor
        } else if(backOffOptions.type === 'exp') {
            return Math.round(Math.exp(attempCounter.current) * backOffOptions.multiplier)
        } else if(backOffOptions.type === 'function') {
            return backOffOptions.getNextInterval(attempCounter.current)
        }        
    }

    const getInfoObj = ():RetrialStateInfo => {
        return {
            stage: (currentStage.current),
            attempCounter: attempCounter.current
        }
    }

    const exec = (data: any) => {
        callback(data)
        .then(res=> {
            if(currentStage.current === "ABORT_UNMOUNTED" || currentStage.current === "ABORT_MANUAL") {
                clearTimeout(timeoutHandler.current)
                //onReject(res, getInfoObj())
                return
            }
            currentStage.current = "STOPED_SUCCESS"
            onResolve(res, getInfoObj())
        })
        .catch(rej => {
            attempCounter.current++

            if(currentStage.current === "ABORT_UNMOUNTED" || currentStage.current === "ABORT_MANUAL") {
                clearTimeout(timeoutHandler.current)
                //onReject(rej, getInfoObj())
                return
            }

            if (attempCounter.current < maxRetry) {
                currentStage.current = "STARTED_FAILED_RETRY"
                const nextDelay = getNextDelay()
                const keepTrying = onFail(attempCounter.current, {...getInfoObj(), nextTryDelay: nextDelay})
                if(keepTrying) {
                    timeoutHandler.current = setTimeout(()=>{exec(data)}, nextDelay)                    
                } else {
                    clearTimeout(timeoutHandler.current)
                    currentStage.current = "STOPED_ABORTED_RETRY"
                    onReject(rej, getInfoObj())
                }
            } else {
                currentStage.current = "STOPED_FAILED"
                clearTimeout(timeoutHandler.current)
                onReject(rej, getInfoObj())
            }
        })
    }
    
    const abortRetry = () => {
        clearTimeout(timeoutHandler.current)
        currentStage.current = "ABORT_MANUAL"
        onReject('', getInfoObj())
    }

    const attemptCall = (data: any) => {
        attempCounter.current = 0
        currentStage.current = "STARTED"
        exec(data)
    }

    return [attemptCall, abortRetry];
}

export default useRetryPromise
