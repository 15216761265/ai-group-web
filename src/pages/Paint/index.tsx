import Card from "@components/Card";
import RouteHeader from "@components/RouteHeader";
import { IHomeRoleList } from "@modals/HomeRoleList";
const PaintImage: IHomeRoleList[] = [
  {
    id: 1192,
    code: "midjourney",
    name: "Midjourney绘画",
    type: "IMAGE",
    description: "使用midjourney进行图片创作",
    prompt: "绘画",
    headImageUrl:
      "https://bucket-1317903499.cos.ap-guangzhou.myqcloud.com/7CDD1E81A83549A8A81BBDEAFB49C123.jpeg",
    displayOnAppSquare: "Y",
    introduction:
      "\uD83C\uDFA8 欢迎使用midjourney绘画  \n\n1. 给我发送描述即可作画，例如 [侠客对决,中国风,古城]\n2. 想要生成效果更好的图，可以前往 [提示词美化](https://chat.link-ai.tech/app/t1zdVNZ1)  应用\n3. 每次作图大约需要1分钟时间，每次消耗150积分，生成失败不扣费，放大操作免费   \n4. 不要携带敏感词汇哦，可能会导致作图失败",
    creatorId: 1,
    nickName: "LinkAI",
    groupId: 8,
    usageCount: 0,
    thumbCount: 15,
    collectCount: 6,
    dataSets: null,
    temperature: "0.7",
    similarity: "MIDDLE",
    replyStrategy: "REPLY",
    fixedReplyText: null,
    supportModelList: [
      {
        code: "LinkAI-3.5",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: true,
      },
      {
        code: "wenxin",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: false,
      },
      {
        code: "xunfei",
        name: null,
        tokensPerScore: 0,
        maxTokens: 2000,
        defaultTokens: null,
        default: false,
      },
      {
        code: "LinkAI-4-turbo",
        name: null,
        tokensPerScore: 0,
        maxTokens: 4000,
        defaultTokens: null,
        default: false,
      },
    ],
    knowledgeBaseCodes: null,
    similarityNumber: 0.0,
    knowledgeBaseSearchRow: null,
    thumb: false,
    collect: false,
    maxContextTurn: null,
    enableMultiAgent: null,
    displayThought: null,
    displayPlugin: null,
    maxThoughtTurns: null,
    appPluginsInfoVos: null,
    knowledgeSourcePreference: null,
  },
];

const PaintPage = () => {
  return (
    <div>
      <RouteHeader></RouteHeader>
      <div>
        {PaintImage.map((list, index) => {
          return <Card key={index} data={list}></Card>;
        })}
      </div>
    </div>
  );
};

export default PaintPage;
