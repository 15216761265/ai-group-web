import { LazyLoadImage } from "react-lazy-load-image-component";
import { LogoIcon } from "@components/Lib/Icon";
import { HomeRoleList } from "@modals/HomeRoleList";
import { useNavigate } from "react-router-dom";

type CardProps = {
  data: HomeRoleList;
};

const Card: React.FC<CardProps> = ({ data: listModalData }) => {
  const navigate = useNavigate();

  const handleClickTheRole = () => {
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
              <LogoIcon className="mr-1"></LogoIcon>
            </div>
            <div>{listModalData.nickName}</div>
          </div>
          <div className="bg-[#ecf5ff] border-[#daecff] text-[#3f9eff] p-1 rounded-md">
            轻应用
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
