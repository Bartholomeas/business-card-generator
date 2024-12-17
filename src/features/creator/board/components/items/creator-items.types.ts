import type { TransformerRes } from "~/features/creator/board/hooks";
import type { StageData } from "~/features/creator/board/stores/card-items-store/card-items-store.types";
import type { OverrideItemProps } from "~/features/creator/board/types/creator-item.types";

export type DefaultCreatorItemProps<T = unknown> = OverrideItemProps<{
	data: StageData<T>;
	transformer: TransformerRes;
}>;
