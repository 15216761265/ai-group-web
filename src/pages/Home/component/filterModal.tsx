import { IHomeRoleModalList } from "@modals/HomeRoleList";
import classnames from "classnames";

type FilterModalListProps = {
  selectedGroupId: string | undefined;
  setSlectedGroupId: (value: string) => void;
  roleModalFilterList?: IHomeRoleModalList[];
  selectActionType: string | undefined;
  setSelectActionType: (value: string) => void;
};

const SortData = [
  {
    id: "LATEST",
    name: "更新",
  },
  {
    id: "COLLECTION",
    name: "收藏",
  },
];

const ItemButton: React.FC<
  Partial<FilterModalListProps> & { item: IHomeRoleModalList }
> = ({ item, setSlectedGroupId, selectedGroupId }) => {
  return (
    <div
      onClick={() => setSlectedGroupId && setSlectedGroupId(item.id)}
      className={classnames(
        "ai-group-home-filter-normal",
        selectedGroupId &&
          selectedGroupId === item.id &&
          "ai-group-home-filter-active"
      )}
    >
      {item.name}
    </div>
  );
};

const FilterModalList: React.FC<FilterModalListProps> = ({
  selectedGroupId,
  setSlectedGroupId,
  roleModalFilterList,
  selectActionType,
  setSelectActionType,
}) => {
  return (
    <div className="ai-group-home-filter">
      <div className="flex items-center">
        <div className="text-[#ababab] mr-2">类别</div>
        <div
          className={classnames(
            "ai-group-home-filter-normal",
            !selectedGroupId && "ai-group-home-filter-active"
          )}
          onClick={() => setSlectedGroupId("")}
        >
          全部
        </div>
        <>
          {roleModalFilterList &&
            roleModalFilterList.map((item, index) => {
              return (
                <ItemButton
                  key={index}
                  item={item}
                  selectedGroupId={selectedGroupId}
                  setSlectedGroupId={setSlectedGroupId}
                />
              );
            })}
        </>
      </div>
      <div className="flex items-center mt-2">
        <div className="text-[#ababab] mr-2">排序</div>
        <div
          className={classnames(
            "ai-group-home-filter-normal",
            !selectActionType && "ai-group-home-filter-active"
          )}
          onClick={() => setSelectActionType("")}
        >
          热门
        </div>
        <>
          {SortData.map((item, index) => {
            return (
              <ItemButton
                key={index}
                item={item}
                selectedGroupId={selectActionType}
                setSlectedGroupId={setSelectActionType}
              />
            );
          })}
        </>
      </div>
    </div>
  );
};

export default FilterModalList;
