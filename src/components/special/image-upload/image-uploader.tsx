"use client";

import { type ChangeEvent, useState, useCallback, useEffect } from "react";

import { Edit, Trash2, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/common/avatar";
import { useToast } from "~/components/common/toast/use-toast";
import { ButtonsInPopover } from "~/components/special/buttons-in-popover";

import { UploadImageModal } from "./upload-image-modal";

import { api } from "~/providers/trpc-provider";

function getImageData(file: File | undefined) {
	if (!file) return;

	let displayUrl;
	if (file) displayUrl = URL.createObjectURL(file);

	return { file, displayUrl };
}

export function ImageUploader() {
	const { data: avatar, isLoading: isAvatarLoading } = api.user.getCurrentUserAvatar.useQuery();

	const { toast } = useToast();
	const utils = api.useUtils();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [preview, setPreview] = useState<string | undefined>(undefined);

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file?.type.startsWith("image/")) {
				const imageData = getImageData(file);
				setPreview(imageData?.displayUrl);
				setModalIsOpen(true);
			} else {
				toast({
					title: "Błąd",
					description: "Proszę wybrać prawidłowy format pliku obrazu.",
					variant: "destructive",
				});
			}
		},
		[toast],
	);

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	const { mutate: mutateDeleteAvatar, isLoading: isDeleteAvatarLoading } =
		api.user.deleteAvatar.useMutation({
			onSuccess: async () => {
				toast({
					title: "Sukces",
					description: "Pomyślnie usunięto Twój awatar.",
				});
				await utils.user.getCurrentUserAvatar.invalidate();
			},
			onError: () => {
				toast({
					title: "Błąd",
					description: "Nie mogliśmy usunąć Twojego awatara.",
					variant: "destructive",
				});
			},
		});

	const deleteAvatar = useCallback(() => {
		setPreview(undefined);
		mutateDeleteAvatar();
	}, [mutateDeleteAvatar]);

	const isLoading = isAvatarLoading || isDeleteAvatarLoading;

	return (
		<div className="flex flex-col items-center gap-4">
			<UploadImageModal
				preview={preview}
				open={modalIsOpen}
				onOpenChange={open => {
					setModalIsOpen(open);
					if (!open) {
						setPreview(undefined);
					}
				}}
			/>
			<div className="relative aspect-square size-48">
				<Avatar className="size-full">
					<AvatarImage
						src={avatar?.url ?? "/"}
						alt="Awatar użytkownika"
						className="object-contain"
					/>
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>

				<div className="absolute -bottom-2 right-2 whitespace-nowrap">
					<ButtonsInPopover
						onFileChange={handleFileChange}
						buttons={[
							{
								text: "Aktualizuj zdjęcie",
								icon: Edit,
								uploadFile: true,
							},
							{
								text: "Usuń zdjęcie",
								isLoading: isDeleteAvatarLoading,
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick: deleteAvatar,
								icon: Trash2,
							},
						]}
						disabled={isLoading}
					>
						{isLoading ? "Przetwarzanie..." : "Edytuj"}
					</ButtonsInPopover>
				</div>
			</div>
		</div>
	);
}
