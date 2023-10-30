import React from "react";

import { SignInForm } from "~/components/public/auth/sign-in-form";
import { Card } from "~/components/ui/card";

import { ImageSection } from "~/components/public/auth/image-section";

const SignIn = () => {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full items-center py-8">
      <Card className="grid h-fit w-full grid-cols-1 items-center rounded-xl md:grid-cols-[1fr,400px] lg:grid-cols-[1fr,600px] xl:grid-cols-[1fr,.8fr]">
        <SignInForm />
        <ImageSection />
      </Card>
    </section>
  );
};

export default SignIn;
