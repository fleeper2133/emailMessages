

## 🚀 Быстрый старт

Следуй этим шагам, чтобы запустить проект:

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/fleeper2133/emailMessages.git
cd ваш-проект
```

### 2. Создайте виртуальное окружение

```bash
python3 -m venv venv
```

### 3. Активируйте виртуальное окружение

Если вы на Windows:

```bash
venv\Scripts\activate
```

Для macOS и Linux:

```bash
source venv/bin/activate
```

### 4. Установите зависимости

```bash
pip install -r requirements.txt
```

### 5. Выполните миграции

```bash
python manage.py migrate
```
### 6. Установите зависимости npm

```bash
npm install
```
### 7. Запустите компиляцию js файлов

```bash
npm run dev-loc
```

### 8. Создать папки для файлов

В корне проекта создайте папки media и внутри media папку files

```bash
mkdir media && mkdir media/files
```

### 9. Убедитесь, что у вас есть redis-server

Для Linux:

```bash
sudo apt install redis-server
```

### 10. Запустите сервер

```bash
python manage.py runserver
```

### Email Авторизация

Для того, чтобы авторизоваться в своей почте нужно создать пароль для внешниз приложений, ниже будет инструкция как сделать для mail почты, для других почт аналогично

Из своего аккаунта на mail.ru нужно создать пароль для доступа к ящику. Для этого нужно зайти в настройки выбрать «Все настройки безопасности» и в «Способах входа» выбрать «Пароли для внешних приложений», создаёте пароль.

### Скриншоты работы приложения
![image](https://github.com/user-attachments/assets/15a66bce-3007-4705-b8f2-f097a504b6ec)
![image](https://github.com/user-attachments/assets/4ad17aad-5215-4e1b-ac82-adad247de69a)
![image](https://github.com/user-attachments/assets/125c1085-bb63-447d-8569-78f43d85db95)




