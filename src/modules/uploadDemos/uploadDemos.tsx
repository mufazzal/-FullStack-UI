import React, { useEffect, useState, useReducer } from 'react'
import LoginButton from '@modules/auth/LoginButton'
import { useTranslation } from "react-i18next";
import { Button, Tooltip, Upload, UploadProps } from "antd";

import { delayedPromise } from '@utils/utils';

import { BaseProps } from '@modals/basePropsInterface'
import { RcFile, UploadFile } from 'antd/es/upload/interface';

interface UploadDemosOwnProps extends BaseProps {
}

const UploadDemos: React.FC<UploadDemosOwnProps> = (props: UploadDemosOwnProps) => {


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
  

  const { t } = useTranslation();

  const fakeChunkFileUpload = (fileName: string, chunkIndex: number, chunk: Blob, startPos: number, endPos: number,): Promise<any> => {
    return delayedPromise(1000 + (chunkIndex * 1000), {startPos, endPos, chunk}).then(res => {
      dispatch({type: "CHUNK_UPLOADED", chunkIndex })
      return {
        fileName, chunkIndex
      }
    })
  }

  const beforeUpload = (fileToUpload: any) => {
    setFileToUpload(fileToUpload)
    const fileSize = fileToUpload.size;
    const chunkSize = 5 * 1000 * 1000;
    const chunkCount = Math.ceil(fileSize / chunkSize);

    const chunksStatus = []    
    for (let i = 0; i < chunkCount; i++) {
      const startPos = chunkSize * i;
      const endPos = startPos === 0 ? chunkSize : i === chunkCount-1 ? fileSize : startPos + chunkSize;
 
      const chunk = fileToUpload.slice(startPos, endPos);

      chunksStatus.push({
        state: 'queued',
        startPos, endPos, chunk
      })
    }

    console.log("size, chunkSize, chunkCount: ", fileSize, chunkSize, chunkCount);
    dispatch({type: "READY_TO_UPLOAD", chunkCount, fileSize, chunkSize, chunksStatus})
  }

  const handleUpload = () => {
    if(!fileToUpload) {
      setError('Select file first')
      return
    }
    for (let i = 0; i < state.chunkCount; i++) {
      const startPos = state.chunkSize * i;
      const endPos = startPos * (i + 1);
      const chunk = fileToUpload.slice(startPos, endPos);

      var fileReader = new FileReader();
      fileReader.readAsBinaryString(chunk);

      fakeChunkFileUpload("tmp", i, chunk, startPos, endPos)
    }
  }

  return <div>
    <Upload beforeUpload={beforeUpload}>
      <Button>Select</Button>
    </Upload>
    <Button onClick={handleUpload}>Upload</Button>
    <br />
      fileSize: {state.fileSize}
      <br />
      chunkCount: {state.chunkCount}
      <br />
      chunkUploaded: {state.chunkUploaded}
      <br />
      uploadingStatus: {state.uploadingStatus}
      <br />
      pregressPercent: {state.pregressPercent}
      <br />  
      Error: {error}
      <br />      
      chunks: {
        state.chunksStatus.map((ck: any, i: number) => {
          return <div><span>{i} : {ck.state} : {ck.startPos} : {ck.endPos}</span></div> 
        })
      }    
  </div>
}

export default UploadDemos
