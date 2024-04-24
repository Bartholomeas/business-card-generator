import { type PropsWithChildren } from "react";
import { PublicTemplate } from "~/components/layout/public-template";

const PublicLayout = ({ children }: PropsWithChildren) => (
  <PublicTemplate>{children}</PublicTemplate>
);

export default PublicLayout;