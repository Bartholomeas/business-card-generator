import type { TransformerRes } from "~/features/creator/hooks";
import type { StageData } from "~/features/creator/stores/card-items-store/card-items-store.types";
import type { OverrideItemProps } from "~/features/creator/types/creator-item.types";

export type DefaultCreatorItemProps<T = unknown> = OverrideItemProps<{
	data: StageData<T>;
	transformer: TransformerRes;
}>;
