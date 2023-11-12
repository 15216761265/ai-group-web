import { LazyLoadImage } from "react-lazy-load-image-component";
import { GroupIcon, LogoIcon } from "@components/Lib/Icon";
import { IHomeRoleList, Type } from "@modals/HomeRoleList";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useRecoilState } from "recoil";
import { UserSelectedModals } from "@recoil/atoms/modals";

type CardProps = {
  data: IHomeRoleList;
};

export const PromptTypeTag = (
  <div className="bg-[#ecf5ff] border-[#daecff] text-[#3f9eff] p-1 rounded-md inline-block">
    轻应用
  </div>
);

export const EmbeddingTypeTag = (
  <div className="bg-[#fdf6ec] border-[#fbebd8] text-[#e6a23c] p-1 rounded-md inline-block">
    知识库
  </div>
);

export const ImageTypeTag = (
  <div className="bg-[#ffeff0] border-[#fee2e1] text-[#f56c6c] p-1 rounded-md inline-block">
    知识库
  </div>
);

const Card: React.FC<CardProps> = ({ data: listModalData }) => {
  const [userSelectedModals, setUserSlectedModals] =
    useRecoilState(UserSelectedModals);
  const navigate = useNavigate();

  const handleClickTheRole = () => {
    const modalIdList =
      userSelectedModals.length && userSelectedModals.map((item) => item.code);
    if (!modalIdList || modalIdList.indexOf(listModalData.code) === -1) {
      setUserSlectedModals([...userSelectedModals, listModalData]);
    }
    navigate(`/chat/${listModalData.code}`);
  };

  return (
    <div className="ai-group-home-role-list-card" onClick={handleClickTheRole}>
      <div className="ai-group-home-role-list-card-img">
        <LazyLoadImage
          src={listModalData.headImageUrl}
          alt="PIC"
          placeholder={<LogoIcon></LogoIcon>}
        />
      </div>
      <div className="ai-group-home-role-list-card-desc">
        <div className="text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden mb-2">
          {listModalData.name}
        </div>
        <div className="text-sm text-[#878786] whitespace-nowrap text-ellipsis overflow-hidden mb-2">
          {listModalData.description}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center w-1/2 overflow-hidden whitespace-nowrap text-ellipsis ">
            <div>
              <GroupIcon className="mr-1"></GroupIcon>
            </div>
            <div>{listModalData.nickName}</div>
          </div>
          <>{listModalData.type === Type.Prompt && PromptTypeTag}</>
          <>{listModalData.type === Type.Image && ImageTypeTag}</>
          <>{listModalData.type === Type.Embedding && EmbeddingTypeTag}</>
        </div>
      </div>
    </div>
  );
};

export default Card;
