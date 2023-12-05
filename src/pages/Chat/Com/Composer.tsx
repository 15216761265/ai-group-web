import "regenerator-runtime";
import { useCallback, useEffect, useState } from "react";
import { Button, Input } from "antd";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AudioOutlined, LoadingOutlined } from "@ant-design/icons";

const CustomizeComposer = (handleSend) => {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSendMsg = useCallback(async () => {
    await handleSend("text", inputValue);
    setInputValue("");
  }, [handleSend, inputValue]);

  useEffect(() => {
    if (!listening && transcript) {
      setInputValue(transcript);
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&lsquo;t support speech recognition.</span>;
  }

  return (
    <div className="flex items-center">
      <Input
        value={inputValue}
        onPressEnter={handleSendMsg}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></Input>
      <div className="mx-2">
        {!listening ? (
          <div onClick={() => SpeechRecognition.startListening()}>
            <AudioOutlined />
          </div>
        ) : (
          <div>
            <LoadingOutlined />
          </div>
        )}
      </div>

      <Button onClick={handleSendMsg} disabled={!inputValue}>
        发送
      </Button>
    </div>
  );
};

export default CustomizeComposer;
