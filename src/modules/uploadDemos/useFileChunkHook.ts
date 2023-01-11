import { RcFile } from 'antd/lib/upload';
import { useEffect, useReducer, useState } from 'react';

export interface RetrialStateInfo {
    stage: string,
    attempCounter: number,
    nextTryDelay?: number 
}
function useFileChunk() : any {

    const [fileToUpload, setFileToUpload] = useState<RcFile | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
  
    const initialState = {
      chunkCount: 0,
      chunkUploaded: 0,
      uploadingStatus: 'not_started',
      pregressPercent: 0,
      chunksStatus: [],
      fileSize: 0, 
      chunkSize: 0,
    }
    const stateReducer = (state: any, action: any): any => {
      switch (action.type) {
        case "READY_TO_UPLOAD":
          let _state: any = {
            chunkCount: action.chunkCount,
            fileSize: action.fileSize,
            chunkSize: action.chunkSize,
            uploadingStatus: 'READY_TO_UPLOAD',
            chunkUploaded: 0,
            pregressPercent: 0,
            chunksStatus: action.chunksStatus
            }
          return _state
        case "CHUNK_UPLOADED":
            const chunkInfo = state.chunksStatus[action.chunkIndex]
            _state = {
              ...state,
              chunkUploaded: state.chunkUploaded + 1,
              pregressPercent: Math.round(((state.chunkUploaded + 1) / state.chunkCount) * 100),
              chunksStatus: [
                ...state.chunksStatus.slice(0, action.chunkIndex), 
                {...chunkInfo, state: 'uploaded'}, 
                ...state.chunksStatus.slice(action.chunkIndex+1)
              ],
              uploadingStatus: state.chunkUploaded + 1 === state.chunkCount ? 'completed' : 'uploading'
            }
  
          return _state        
        default:
          return state;
      }
    };
    const [state, dispatch] = useReducer(stateReducer, initialState);    

    useEffect(() => {
        return () => {
        }
    }, [])

    
    const abortRetry = () => {}

    const attemptCall = (data: any) => {}

    return [attemptCall, abortRetry];
}

export default useFileChunk
