import React from 'react';

import dynamic from "next/dynamic";

const CardWizardBoard = dynamic(() => import("~/features/creator/components/card-wizard-board").then(res => res.CardWizardBoard), { ssr: false });


const UserCardsPage = () => {
  return (
    <div className="flex size-full">
      <CardWizardBoard />
    </div>
  );
};

export default UserCardsPage;
