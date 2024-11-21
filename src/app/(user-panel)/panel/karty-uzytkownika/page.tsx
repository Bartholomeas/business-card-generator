import React from 'react';

import dynamic from "next/dynamic";

const CardCreator = dynamic(() => import("~/features/creator/card-creator").then(res => res.CardCreator), { ssr: false });


const UserCardsPage = () => {
  return (
    <div className="flex size-full">
      <CardCreator />
    </div>
  );
};

export default UserCardsPage;
