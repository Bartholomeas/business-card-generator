import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/common/avatar";

const mockData = [
  {
    id: 1,
    type: "opinion",
    author: "Marek Kowalski",
    content: "Świetna obsługa i profesjonalne podejście do klienta!",
    rating: 5,
    time: "2 minuty temu",
    avatar: "/avatars/01.png",
    initials: "MK"
  },
  {
    id: 2,
    type: "comment",
    author: "Anna Nowak",
    content: "Czy możecie polecić jakieś konkretne rozwiązanie dla małej firmy?",
    time: "15 minut temu",
    avatar: "/avatars/02.png",
    initials: "AN"
  },
  {
    id: 3,
    type: "opinion",
    author: "Tomasz Wiśniewski",
    content: "Bardzo dobry kontakt i szybka realizacja zamówienia.",
    rating: 4,
    time: "1 godzinę temu",
    avatar: "/avatars/03.png",
    initials: "TW"
  },
  {
    id: 4,
    type: "comment",
    author: "Katarzyna Lewandowska",
    content: "Dziękuję za szybką odpowiedź na moje pytania!",
    time: "2 godziny temu",
    avatar: "/avatars/04.png",
    initials: "KL"
  },
  {
    id: 5,
    type: "opinion",
    author: "Piotr Zieliński",
    content: "Wizytówki wyglądają dokładnie tak jak chciałem. Polecam!",
    rating: 5,
    time: "3 godziny temu",
    avatar: "/avatars/05.png",
    initials: "PZ"
  }
];

export function RecentOpinions() {
  return (
    <div className="space-y-6">
      {mockData.map((item) => (
        <div key={item.id} className="flex items-start space-x-4">
          <Avatar className="size-10">
            <AvatarImage src={item.avatar} alt={item.author} />
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.author}</p>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            {item.type === "opinion" && (
              <div className="flex items-center space-x-1">
                {Array.from({ length: item.rating ?? 0 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
