import "regenerator-runtime";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!listening && transcript) {
      setInputValue(transcript);
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&lsquo;t support speech recognition.</span>;
  }

  const handleSendMsg = async () => {
    await handleSend("text", inputValue);
    setInputValue("");
  };

  return (
    <div className="flex items-center">
      <Input.TextArea
        rows={1}
        value={inputValue}
        onPressEnter={handleSendMsg}
      ></Input.TextArea>
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

      <Button onClick={handleSendMsg} disabled={!!inputValue}>
        发送
      </Button>
    </div>
  );
};

export default CustomizeComposer;
