import { errorMessages } from "~/utils/errors/errors.constants";
import { type ApiError, type ErrorCodes } from "~/utils/errors/errors.types";
import { toast } from "~/components/common";

// const errorMessages = {
//   invalid_credentials: "Podane dane są nieprawidłowe",
//   invalid_password: "Podane hasło jest nieprawidłowe",
//   invalid_email: "Podany e-mail jest niepoprawny",
//   shopping_cart_not_found: "Koszyk nie został znaleziony",
//   customer_exists: "Taki użytkownik już istnieje",
//   user_exists: "Taki użytkownik już istnieje",
//   user_not_found: "Nie znaleziono użytkownika",
//   user_not_active: "Użytkownik nie jest aktywny",
//   payment_method_is_required:
//     "Nie znaleziono metody płatności, a jest konieczna do złożenia zamówienia.",
//   coupon_already_added: "Kupon jest już dodany do koszyka",
//   coupon_usage_limit_reached: "Nie znaleziono kuponu, wygasł lub jest już wykorzystany.",
//   coupon_name_not_found: "Taki kupon nie istnieje lub stracił ważność.",
//   unknown_error: "Wystąpił nieznany błąd, spróbuj ponownie.",
//   product_variant_not_accessible: "Wariant produktu jest niedostępny.",
//   shipping_method_cannot_be_set_to_shopping_cart: "Ta metoda dostawy nie może zostać przypisana do obecnego koszyka.",
//   payment_method_not_found: "Nie znaleziono metody płatności.",
// };

const isErrorCode = (code?: string): code is ErrorCodes =>
  code ? Object.keys(errorMessages).includes(code) : false;

export const getErrorMessage = (code: ErrorCodes | undefined = "unknown"): string =>
  errorMessages[code];
// else return errorMessages.unknown;

export const handleClientError = (_error: Error | string | undefined) => {
  if (_error instanceof Error || _error === undefined) {
    return toast({
      title: "Wystąpił błąd",
      description: "getErrorMessage(undefined)",
      variant: "destructive",
    });
  }
  // console.log("Błąd:", _error || "Nieokreślony błąd");

  const error = JSON.parse(_error) as ApiError;

  let description: string;
  const title = "Wystąpił błąd";
  //
  // if (error.errors?.[0]?.code === "coupon_already_added") {
  //   title = "Kupon jest już aktywny";
  // }
  // if (error.errors?.[0]?.code === "coupon_name_not_found") {
  //   title = "Niepoprawny kupon";
  // }
  // if (error.errors?.[0]?.code === "coupon_usage_limit_reached") {
  //   title = "Niepoprawny kupon";
  // }

  if (isErrorCode(error.errors?.[0]?.code)) description = getErrorMessage(error.errors?.[0]?.code);
  else description = getErrorMessage(undefined);

  return toast({
    title,
    description,
    variant: "destructive",
  });
};

// export const catchError = async <T = ApiError>(err: unknown): Promise<T> => {
//   if (err instanceof Response) {
//     if (err.status === 401) await createGuest();
//     const error = (await err.json()) as ApiError;
//
//     if (err.status === 401 && typeof window !== "undefined") {
//       await refreshCookie();
//       await createGuest();
//     }
//
//     if (typeof window !== "undefined") throw JSON.stringify(error);
//     else return error as T;
//   } else {
//     if (typeof window !== "undefined")
//       throw JSON.stringify({
//         isError: true,
//         status: 500,
//         code: "unknown_error",
//         message: JSON.stringify(err),
//       });
//
//     return { isError: true, status: 500, error: JSON.stringify(err) } as T;
//   }
// };