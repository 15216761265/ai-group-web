declare module "*.svg" {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

enum SpeechState {
  IDLE,
  LISTENING,
  PROCESSING,
}
