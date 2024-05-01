"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddCommentForm = () => {
  const methods = useForm({ defaultValues: { content: null }, resolver: zodResolver() });

  return <p>xd</p>;
};