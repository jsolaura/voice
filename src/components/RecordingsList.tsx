import React, {Fragment} from 'react';
import {Audio, RecordingsListProps} from "../types/recorder";
import styled from "styled-components";
import useRecordingsList from "../hooks/useRecordingsList";

const ListContainer = styled.section`
  height: 85%;   
  padding: 0 2rem;
  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }
  .no-records {
    height: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    font-size: 2rem;
    text-align: center;
  }
  .recordings-list {
    max-height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-track { background: #e4d3cf }
    &::-webkit-scrollbar-thumb { background: #099fff }
    
    .record {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding: 0.5rem;
      audio {
        min-width: 80%;
        max-width: 60%;
      }
      .delete-button-container {
        min-width: 20%;
        max-width: 10%;
        display: grid;
        place-content: center;
        .delete-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          border: none;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          &:hover {
            color: #fd1c03;
          }
        }
      }
    }
  }

`;

const RecordingsList = ({ audio, audioName }: RecordingsListProps) => {
    const { recordings, deleteAudio } = useRecordingsList(audio, audioName);

    return (
        <ListContainer>
            <div className='recordings-container'>
                {recordings.length > 0 ? (
                    <>
                        <div className='recordings-list'>
                            {recordings.map((record: Audio) => (
                                <Fragment key={record.key}>
                                    <h3>{record.name}</h3>
                                    <div className='record'>
                                        <audio controls controlsList='nodownload' src={record.audio} />
                                        <div className='delete-button-container'>
                                            <button
                                                className='delete-button'
                                                title='Delete this audio'
                                                onClick={() => deleteAudio(record.key)}
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}

                        </div>
                    </>
                ) : (
                    <div className='no-records'>
                        🙅🏻 <span> You don't have records</span>
                    </div>
                )}
            </div>
        </ListContainer>
    );
};

export default RecordingsList;