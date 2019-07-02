#Генератор математических заданий по шаблону.

##Список основных возможностей:
1. Генерация заданий по шаблону
2. Настройка доступных числовых значений
3. Поддержка вычислений в шаблонах
4. Дублирование заданий в нужном количестве
5. Поддержка TeX
6. Перемешивание заданий
7. Адаптация под печать на A4

##Поддерживаемые команды
###Переменные 
В качестве переменных используются !A, !B, ..., !Z. Генератор выполняет в них подстановку случайных числовых значений.
По умолчанию генерируются ненулевые целые значения от -20 до 20.
>!Ax+!B=0 ➜ 3x+5=0

###Вычисления
Для того, чтобы проивести вычисления с числами и переменными, необходимо записывать их в скобках
>!A + !B ➜ 2 + 4
>(!A + !B) ➜ 6

Для вычислений доступны основные арифметические операции (+,-,*,/), а также следующие функции:
>abs() - модуль числа abs(20-30)=10
>pow() - степень числа pow(3,4)=81
>sqrt() - квадратный корень sqrt(144)=12
>sin() - синус угла (в радианах)
>cos() - косинус угла (в радианах)
>tan() - тангенс угла (в радианах)

###Выбор из списка
Для выбора случайного значений из перечня, необходимо записывать их в квадратных скобках через ;
>[0;30;45;60;90] ➜ 30

###Повтор задания
Для повтора задания несколько раз, необходимо в конце строки в квадратных скобках указать необходимое количество
>!Ax+!B=0[4] ➜ -2x+4=0 7x-11=0 8x-2=0 7x+6=0

###TeX
Для оформления заданий (дроби, системы, etc) используется язык TeX. С его синтаксисом можно ознакомиться [тут](https://en.wikibooks.org/wiki/LaTeX/Mathematics), также доступен [визуальный редактор](http://hostmath.com).