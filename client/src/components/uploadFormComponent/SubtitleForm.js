import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import styles from "./styles/subTitileFormStyles.module.css";

const SubtitleForm = ({ videoRef, updateShowSubTitleOverlay, setSeekMode, setShowActiveSubtitle, setStartTime, startTime, setEndTime, endTime, subtitles, setSubtitles, selectedVideo, setSliderTime }) => {



    const [subtitleText, setSubtitleText] = useState('');




    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 1000);
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
            milliseconds: String(milliseconds).padStart(3, '0'),
        };
    };



    const handleSubtitleTextChange = (e) => {
        setSubtitleText(e.target.value);
    };

    const handleAddSubtitle = () => {
        const newSubtitle = {
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            text: subtitleText,
        };

        setSubtitles([...subtitles, newSubtitle]);
        // console.log(newSubtitle);
        // setShowActiveSubtitle([...showActiveSubtitle, newSubtitle]);
        setShowActiveSubtitle(newSubtitle);
        // // Clear the subtitle text input
        setSubtitleText('');
    };

    const handleStarTimeIncrement = (unit) => {

        setSeekMode(true);
        const video = videoRef.current;
        let newTime;

        switch (unit) {
            case 'minutes':
                newTime = parseFloat(startTime) + 60;
                break;
            case 'seconds':
                newTime = parseFloat(startTime) + 1;
                break;
            case 'milliseconds':
                // newTime = parseFloat(startTime) + 0.001; // 1 milli
                // newTime = parseFloat(startTime) + 0.01; // 10 milli
                newTime = parseFloat(startTime) + 0.1; // 100 milli
                break;
            default:
                break;
        }

        if (video) {
            setStartTime(newTime);
            // setEndTime(newTime + 0.01); // Update end time correctly
            video.currentTime = newTime;
            setSliderTime(newTime);
        }
    };


    const handleStarTimeDecrement = (unit) => {

        setSeekMode(true);

        const video = videoRef.current;
        let newTime;

        switch (unit) {
            case 'minutes':
                newTime = Math.max(0, parseFloat(startTime) - 60); // Decrement by 60 seconds (1 minute), ensuring it doesn't go below 0
                break;
            case 'seconds':
                newTime = Math.max(0, parseFloat(startTime) - 1); // Decrement by 1 second, ensuring it doesn't go below 0
                break;
            case 'milliseconds':
                newTime = Math.max(0, parseFloat(startTime) - 0.1); // Decrement by 0.1 second (100 milliseconds), ensuring it doesn't go below 0
                break;
            default:
                break;
        }

        setStartTime(newTime);
        // setEndTime(newTime + 0.01); // Adjust end time accordingly
        video.currentTime = newTime;
        setSliderTime(newTime);

    };

    const handleIncrementEndTime = (unit) => {

        setSeekMode(false);

        const video = videoRef.current;
        let newEndTime;

        switch (unit) {
            case 'minutes':
                newEndTime = parseFloat(endTime) + 60; // Increment by 60 seconds (1 minute)
                break;
            case 'seconds':
                newEndTime = parseFloat(endTime) + 1; // Increment by 1 second
                break;
            case 'milliseconds':
                newEndTime = parseFloat(endTime) + 0.1; // Increment by 0.1 second (100 milliseconds)
                break;
            default:
                break;
        }

        setEndTime(newEndTime);
        video.currentTime = newEndTime;
        setSliderTime(newEndTime);

    };

    const handleDecrementEndTime = (unit) => {

        setSeekMode(false);


        const video = videoRef.current;
        let newEndTime;

        switch (unit) {
            case 'minutes':
                newEndTime = Math.max(startTime, parseFloat(endTime) - 60); // Decrement by 60 seconds (1 minute), ensuring it doesn't go below startTime
                break;
            case 'seconds':
                newEndTime = Math.max(startTime, parseFloat(endTime) - 1); // Decrement by 1 second, ensuring it doesn't go below startTime
                break;
            case 'milliseconds':
                newEndTime = Math.max(startTime, parseFloat(endTime) - 0.1); // Decrement by 0.1 second (100 milliseconds), ensuring it doesn't go below startTime
                break;
            default:
                break;
        }

        setEndTime(newEndTime);
        video.currentTime = newEndTime;
        setSliderTime(newEndTime);
    };

    const handleListSubtitleClicked = (clickedSub) => {

        setSeekMode(false);
        // Update startTime and endTime states with the clicked subtitle's start and end times
        setStartTime(parseFloat(clickedSub.startTime.minutes) * 60 +
            parseFloat(clickedSub.startTime.seconds) +
            parseFloat(clickedSub.startTime.milliseconds) / 1000);

        setEndTime(parseFloat(clickedSub.endTime.minutes) * 60 +
            parseFloat(clickedSub.endTime.seconds) +
            parseFloat(clickedSub.endTime.milliseconds) / 1000);

        setSliderTime(parseFloat(clickedSub.startTime.minutes) * 60 +
            parseFloat(clickedSub.startTime.seconds) +
            parseFloat(clickedSub.startTime.milliseconds) / 1000);

        // Seek the video player to the start time of the clicked subtitle
        const video = videoRef.current;
        video.currentTime = parseFloat(clickedSub.startTime.minutes) * 60 +
            parseFloat(clickedSub.startTime.seconds) +
            parseFloat(clickedSub.startTime.milliseconds) / 1000;
        updateShowSubTitleOverlay(video.currentTime);

    };

    const sampleSubtitles = [
        {
            startTime: {
                minutes: 0,
                seconds: 5,
                milliseconds: 500,
            },
            endTime: {
                minutes: 0,
                seconds: 10,
                milliseconds: 800,
            },
            text: "Welcome to the world of subtitles.",
        },
        {
            startTime: {
                minutes: 0,
                seconds: 15,
                milliseconds: 200,
            },
            endTime: {
                minutes: 0,
                seconds: 20,
                milliseconds: 400,
            },
            text: "Explore the beauty of nature.",
        },
        {
            startTime: {
                minutes: 0,
                seconds: 25,
                milliseconds: 600,
            },
            endTime: {
                minutes: 0,
                seconds: 30,
                milliseconds: 300,
            },
            text: "Learn and grow every day.",
        },
        {
            startTime: {
                minutes: 0,
                seconds: 35,
                milliseconds: 150,
            },
            endTime: {
                minutes: 0,
                seconds: 40,
                milliseconds: 700,
            },
            text: "Embrace the journey of life.",
        },
        {
            startTime: {
                minutes: 0,
                seconds: 45,
                milliseconds: 400,
            },
            endTime: {
                minutes: 0,
                seconds: 50,
                milliseconds: 100,
            },
            text: "Dance like nobody is watching.",
        },
        {
            startTime: {
                minutes: 0,
                seconds: 55,
                milliseconds: 800,
            },
            endTime: {
                minutes: 1,
                seconds: 0,
                milliseconds: 250,
            },
            text: "Smile, it's contagious.",
        },
        {
            startTime: {
                minutes: 1,
                seconds: 5,
                milliseconds: 300,
            },
            endTime: {
                minutes: 1,
                seconds: 10,
                milliseconds: 600,
            },
            text: "In the middle of difficulty lies opportunity.",
        },
        {
            startTime: {
                minutes: 1,
                seconds: 15,
                milliseconds: 750,
            },
            endTime: {
                minutes: 1,
                seconds: 20,
                milliseconds: 50,
            },
            text: "Create your own sunshine.",
        },
        {
            startTime: {
                minutes: 1,
                seconds: 25,
                milliseconds: 500,
            },
            endTime: {
                minutes: 1,
                seconds: 30,
                milliseconds: 200,
            },
            text: "Believe in yourself.",
        },
        {
            startTime: {
                minutes: 1,
                seconds: 35,
                milliseconds: 900,
            },
            endTime: {
                minutes: 1,
                seconds: 40,
                milliseconds: 350,
            },
            text: "You are capable of amazing things.",
        },
        // Add more subtitle objects as needed
    ];


    return (
        <div className={styles.subtitleInputWrapper}>

            <div className={styles.subtitleInputInnerWrapper} >

                <div className={styles.timeSubInputFormWrapper}>
                    <div className={styles.startTimeWrapper}>
                        <div className={styles.startTimeContainer}>

                            <div className={styles.labelWrapper}>
                                <p style={{ color: selectedVideo ? '#7F56D9' : '#98A2B3' }}>START TIME</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <div className={`${styles.timeWrapper} ${styles.minWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeIncrement('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(startTime).minutes}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(e.target.value) * 60) + parseFloat(formatTime(startTime).seconds) + (parseFloat(formatTime(startTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeDecrement('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.secWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeIncrement('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(startTime).seconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(startTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(startTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeDecrement('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.milliSecWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeIncrement('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        className={` ${styles.timeInput}`}
                                        value={formatTime(startTime).milliseconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(startTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(startTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleStarTimeDecrement('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.endTimeWrapper}>
                        <div className={styles.endTimeContainer}>
                            <div className={styles.labelWrapper}>
                                <p style={{ color: selectedVideo ? '#7F56D9' : '#98A2B3' }}>END TIME</p>
                            </div>
                            <div className={styles.inputWrapper}>
                                <div className={`${styles.timeWrapper} ${styles.minWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleIncrementEndTime('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(endTime).minutes}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(e.target.value) * 60) + parseFloat(formatTime(endTime).seconds) + (parseFloat(formatTime(endTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleDecrementEndTime('minutes')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.secWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleIncrementEndTime('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={`${styles.timeInput}`}
                                        value={formatTime(endTime).seconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(endTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(endTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleDecrementEndTime('seconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>

                                <div className={`${styles.timeWrapper} ${styles.milliSecWrapper}`}>
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleIncrementEndTime('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={4} />
                                    </button>
                                    <input
                                        style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                        disabled={selectedVideo ? false : true}
                                        className={` ${styles.timeInput}`}
                                        value={formatTime(endTime).milliseconds}
                                        onChange={(e) =>
                                            setStartTime((parseFloat(formatTime(endTime).minutes) * 60) + parseFloat(e.target.value) + (parseFloat(formatTime(endTime).milliseconds) / 1000))
                                        }
                                    />
                                    <button disabled={selectedVideo ? false : true} className={styles.timeToggleBtn} onClick={() => handleDecrementEndTime('milliseconds')}>
                                        <Icon className={styles.incredecreIcon} icon="eva:chevron-up-fill" rotate={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.subtitleTextInputWrapper}>
                        <div className={styles.subtitleTextInputContainer}>
                            <div className={styles.labelWrapper}>
                                <p style={{ color: selectedVideo ? '#7F56D9' : '#98A2B3' }}>SUBTITLE TEXT</p>
                            </div>
                            <div className={styles.subInputWrapper}>
                                <input
                                    style={{ color: selectedVideo ? 'black' : '#D0D5DD' }}
                                    disabled={selectedVideo ? false : true}
                                    className={styles.subtitleTextInput}
                                    value={subtitleText}
                                    onChange={handleSubtitleTextChange}
                                />
                            </div>
                            <div className={styles.addBtnWrapper}>
                                {subtitleText.length !== 0 &&
                                    <button type='button' className={styles.addBtn} onClick={handleAddSubtitle}>
                                        <Icon className={styles.addBtnIcon} icon="radix-icons:arrow-up" rotate={1} />
                                    </button >
                                }
                            </div>
                        </div>
                    </div>
                </div>




                <div className={styles.add_list_and_header_wrapper}>


                    <div className={styles.addedListHeaderWraper}>
                        <p>Added Subtitles</p>
                    </div>


                    <div className={styles.addedSubsListWrapper}>
                        {subtitles.length > 0 ? (
                            subtitles.map((subtitle, index) => (
                                <div
                                    className={styles.addListItemWrapper}
                                    onClick={() => handleListSubtitleClicked(subtitle)}>
                                    <div className={styles.startTimeStampDiv}>
                                        <p>{`${subtitle.startTime.minutes}: ${subtitle.startTime.seconds}:${subtitle.startTime.milliseconds}`}</p>
                                    </div>
                                    <div className={styles.endTimeStampDiv}>
                                        <p>{`${subtitle.endTime.minutes}: ${subtitle.endTime.seconds}:${subtitle.endTime.milliseconds}`}</p>
                                    </div>
                                    <div className={styles.subtitleTextDiv}>
                                        <div className={styles.subtitleTextInnerDiv}>
                                            <p className={styles.subtitleText}> {subtitle.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noSubMessageText}> • Add subtitles to show</p>
                            // <div
                            //     className={styles.addListItemWrapper}
                            //  >
                            //     <div className={styles.startTimeStampDiv}>
                            //         <p>{`${`01`}: ${`02`}:${`23`}`}</p>
                            //     </div>
                            //     <div className={styles.endTimeStampDiv}>
                            //         <p>{`${`02`}: ${`15`}:${`48`}`}</p>
                            //     </div>
                            //     <div className={styles.subtitleTextDiv}>
                            //         <div className={styles.subtitleTextInnerDiv}>
                            //             <p className={styles.subtitleText}> {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</p>
                            //         </div>
                            //     </div>
                            // </div>
                        )}
                    </div>


                </div>
            </div>

        </div >
    )
}

export default SubtitleForm


