# Refleksjonsnotat - Video Poker
## Læringsprosess
Læringsprosessen min så langt dette semesteret har vært litt kaotisk.
Det begynte med at jeg så på alle forelesningene direkte og gikk gjennom modulen for hver uke, men på grunn av den korte tidsfristen på arbeidskravet endte jeg opp med å droppe flere forelesninger og moduler for å rekke å komme i mål.

I de viktigste modulene for arbeidskravet kunne jeg innholdet fra før, så det meste av læring ble gjort på egenhånd ved å jobbe med koden eller søke opp artikler og forum innlegg. Jeg prøvde å gjøre så mye som mulig selv, og søkte kun på nett om jeg var usikker på et konsept, eller ville vite om det fantes en bedre løsning på noe.

## Utføring av oppgaven
Jeg begynte med å finne inspirasjon. [Eksempelet i oppgave](https://www.freeslots.com/poker.htm) var et godt utgangspunkt i regler og funksjonalitet, men utseende var ganske utdatert, eller i hvert fall ikke etter min stil. Jeg valgte å heller designe et mer forenklet og moderne design som man finner [her](https://www.figma.com/design/n40YI3j4dhMDZxRc00Wk45/Arbeidskrav-5---Poker?node-id=0-1&t=GMgqdYrT56p0B94w-1).

Så var det å begynne å kode. Jeg begynte lett med å sette opp prosjektet og lage kortene. Jeg fant en artikkel som snakket om Fisher-Yates sorteringsmetoden, som virket som det beste valget her.

Baksiden av kortene er per nå kun vist når noen spiller for første gang, men var ment å vises som del av en animasjon der kortene blir snudd, men som jeg ikke fikk tid til. Grunnen til at baksiden av kortene ikke er en egen komponent er fordi de bare består av tre linjer med kode, og flere filer ville bare gjort arbeid med resten av prosjektet mer komplisert.

Det meste av spillet blir håndtert av gameStore.ts igjennom Zustand. "Persist" blir brukt for å lagre dataen i local storage. "startGame" og "endGame" er det som styrer det meste av spillet, og er satt opp slik at alt oppdateres i riktig rekkefølge, f.eks. at hånden og kortstokken aldri holder samme kort.
For beste brukeropplevelsen blir alle brukeres spill lagret når de logger ut, slik at de kan fortsette der de slapp når som helst.

"getPayout" funksjonen og "faceIDs" const-en bruker triks som jeg lærte av en jeg var på gruppe med forrige arbeidskrav. Begge utnytter Record typen som gjør at man kan sende inn en nøkkel, og få verdien tilknyttet nøkkelen tilbake. For å ikke måtte importere alle bildene i faceID const-en manuelt brukte jeg "glob" som er innebygd i Vite.

Den mest kompliserte funksjonen derimot er nok "getRank" som går igjennom hånden til spilleren, og finner ut nøyaktig hvilken poker-hånd de har (par, straight, flush, osv). Jeg slet i begynnelsen ganske mye med å lage denne funksjonen, men etter mye tenking og nedbryting av problemet, klarte jeg å få logikken til å gå opp sakte men sikkert. Det var spesielt tilfredsstillende å optimalisere denne funksjonen. For eksempel kan man ikke ha flere like tall hvis man har flush, og hvis kortene er sortert og ikke er par, så har man straight hvis det er 4 mellom det høyeste og laveste kortet.

Andre ting å poengtere er at man ikke kan trykke på bet-knappene under spillet, eller kortene mellom spill. Brukernavnet har også restriksjoner for å hindre for korte, for lange, eller like brukernavn. Og man kan ikke vedde for mer enn det man har råd til.

## Problemer underveis
Jeg slet litt i begynnelsen med håndteringen av dataen i zustand store-en. Istedenfor å ha én action for hver state, måtte jeg kombinere flere for å få dataen som var avhengig av hverandre til å oppdatere seg synkront. Derfor er startGame og endGame litt kompliserte.

Jeg slet med posisjonering av kort-elementene en del. Først fikk jeg ikke sentrert dem uten å legge til en container rundt, så fikk jeg ikke kortene til å krympe riktig pga. hvordan grid var satt opp. Kortene på bunn fikk jeg ikke til å sentrere pga. restriksjoner med grid, men flex hadde andre problemer som gjorte at grid fortsatt ble beholdt.

Zustand hadde en tendens til å vise en haug med røde streker selv om ingenting var galt. Det gjorde bare at jeg måtte starte vs-code på nytt et par ganger, men var litt irriterende.

Som nevnt tidligere, så hadde jeg ikke nok tid til å implementere animasjoner, og heller ikke lyder, så lyd-knappen er til nå ikke i bruk. Om jeg kunne, ville jeg nok også lagt til noen innstillinger for å skru av hint, eller skru på historikk eller en trener.

## Hva jeg har lært

Selv om jeg hadde mye erfaring med React fra før, og litt erfaring med Zustand og states, så lærte jeg en god del nytt under prosjektet. For eksempel:
- Henting av data fra et form med action istedenfor onSubmit
- Mer avanserte måter å bruke grid
- Mer avanserte måter å sortere på i JavaScript
- Fisher-Yates sortering
- Vite glob importering
- Regular expression (RegEx)
- CSS container queries

Og ting jeg allerede kunne har jeg selvsagt blitt bedre på.

## Kilder
- Vincent, W. (2017, 18. desember). Object-Oriented JavaScript: Deck of Cards. *Will Vincent*. https://wsvincent.com/javascript-object-oriented-deck-cards/
- Bernat (2024, 22 mai). *Setting minimum and maximum number of columns using CSS Grid*. Stack Overflow. https://stackoverflow.com/a/69154193
- stacj (2022, 2. februar). *Sort an array of objects based on frequency but keep repeated elements*. Stack Overflow. https://stackoverflow.com/a/70955903
- Teneff (2024, 19. juli). *Javascript Split string on UpperCase Characters*. Stack Overflow. https://stackoverflow.com/a/7888303
- Stanford University IT. (2026, 14. mai) *Screen Reader-Only Content*. https://uit.stanford.edu/accessibility/techniques/websites/screenreader
- Vite. (2026, 25. september). *Glob Import*. https://vite.dev/guide/features#glob-import
- RegEx tester https://regexr.com