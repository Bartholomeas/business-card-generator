import React from "react";

import { Card } from "~/components/common/card";
import { ImageSection } from "~/components/public/auth/image-section";
import { SignUpForm } from "~/components/public/auth/signup-form";

const SignUp = () => {
	return (
		<section className="flex min-h-[calc(100vh-4rem)] w-full items-center py-8">
			<Card className="grid h-fit w-full grid-cols-1 items-center rounded-xl md:grid-cols-[1fr,400px] lg:grid-cols-[1fr,600px] xl:grid-cols-[1fr,.8fr]">
				<SignUpForm />
				<ImageSection />
			</Card>
		</section>
	);
};

export default SignUp;
