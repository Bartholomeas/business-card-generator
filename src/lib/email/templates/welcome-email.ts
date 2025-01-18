export const getWelcomeEmailHtml = (name: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Witaj w Kwirk!</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Witaj ${name}!</h1>
      <p>Dziękujemy za rejestrację w serwisie Kwirk.</p>
      <p>Twoje konto zostało pomyślnie utworzone. Możesz teraz zalogować się i rozpocząć tworzenie swojej wizytówki.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/zaloguj-sie" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Zaloguj się
        </a>
      </div>
      <p>Jeśli masz jakiekolwiek pytania, nie wahaj się z nami skontaktować.</p>
      <p>Pozdrawiamy,<br>Zespół Kwirk</p>
    </div>
  </body>
</html>
`;
