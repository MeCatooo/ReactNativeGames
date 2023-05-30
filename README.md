# ReactNativeGames

Aplikacja oparta o hybrydowy framework ReactNative, jednak przystosowana tylko do Androida. Posiada 2 gry do których można się dostać z dłównego menu tuż po przeminięciu splash screena, są to gry memory i ball.

Memory polega na dobraniu dwóch takich samych kart z jak najmniejszym scorem, stan gry jest zapisywany i można ją kontynuować nawet po wyłączeniu aplikacji. Ilość kart można edytować w Settings.

Ball game polegająca na turlaniu kulki za pomocą obracania telefonu aby trafiła do celu jak najwięcej razy w określonym czasie, highest score jest zapisywany na telefonie. Po każdym trafieniu kulka przyśpiesza. Czas gry można zmieniać w Settigns

Oprócz wymienionych gier aplikacja posiada także ekrany About z krótkim podsumowaniem aplikacji, Settings gdzie można edytować ustawienia gier i Profile użytkownika do którego można się dostać za pomocą ikony w prawym górny rogu.

Na profilu użytkownika można wybrać nazwę, która zostanie na stałe zapisana i zrobić zdjęcie aby ustawić je jako miniaturkę profilu. Ważne aby pamiętać że zmiana miniaturki będzie miała efekt dopiero po restarcie aplikacji.

Aby uruchomić aplikację należy zainstalować wymagane pakiety za pomocą npm i

Następnie można uruchomić projekt używająć npm start a następnie wybierająć opcję android 

Jeżeli aplikacja nie załuduje się na emulatorze/telefonie należy wpisać w konsolę R

Aby uruchomić testy należy użyć npm test, mogą się pojawić błedy w konsoli, jednak nie wpływają na testy