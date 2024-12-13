# Простое API на NestJS с использованием GraphQL

Этот проект является простым примером API, построенного с использованием NestJS и GraphQL. В нем реализована базовая структура для работы с GraphQL-запросами и мутациями.

## Структура проекта

- `src/`
  - `app.module.ts` — главный модуль приложения.
  - `*name*/`
    - `*name*.module.ts` — модуль пользователей.
    - `*name*.service.ts` — сервис для работы с базой данных.
    - `*name*.resolver.ts` — резолвер GraphQL для обработки запросов и мутаций.
    - `*name*.entity.ts` — сущность.

## Установка и запуск

1. Склонируйте репозиторий с ветки development:

   ```bash
   git clone https://github.com/Prime-GS/OTUS-LeetCode-API.git
   cd OTUS-LeetCode-API
   ```

2. Установите зависимости:

   ```bash
   yarn
   ```

3. Запустите приложение в режиме разработки:

   ```bash
   yarn dev
   ```

4. Перейдите в браузер и откройте [http://localhost:8080/graphql](http://localhost:8080/graphql), чтобы открыть GraphQL Playground, где можно выполнять запросы и мутации.

## Пример использования

В этом примере API предоставляет возможности для управления данными. 

### Все запросы

Ниже будет приведенна структура, которую можно вставить в Graphql страницу запросов и использовать данные из них:

```graphql
fragment UserFragment on User {
  id
  firstName
  lastName
  middleName
  fullName
  email
  roles
  createdAt
  updatedAt
}

fragment TagFragment on Tag {
  id
  title
  description
  createdAt
  updatedAt
}

fragment CommentFragment on Comment {
  id
  title
  taskId
  task {
    ...TaskFragment
  }
  userId
  user {
    ...UserFragment
  }
  createdAt
  updatedAt
}

fragment TaskFragment on Task {
  id
  title
  description
  difficulty
  tags {
    ...TagFragment
  }
  input
  result
  createdAt
  updatedAt
}

query Users {
  users {
    data {
    	...UserFragment
  	}
    total
  }
}

query Tags {
  tags {
    data {
    	...TagFragment
  	}
    total
  }
}

query Tasks {
  tasks {
    data {
	    ...TaskFragment
  	}
    total
  }
}

query Comments($commentTaskId: Int!) {
  commentsByTask(taskId: $commentTaskId) {
    data {
	    ...CommentFragment
  	}
    total
  }
}

mutation Login($login: LoginInput!) {
  login(input: $login) {
    user {
      ...UserFragment
    }
    token
  }
}

mutation CreateTag($tag: TagInput!) {
  createTag(input: $tag) {
    ...TagFragment
  }
}

mutation CreateTask($task: TaskInput!) {
  createTask(input: $task) {
   	...TaskFragment
  }
}

mutation PostComment($comment: CommentInput!) {
  postComment(input: $comment) {
   	...CommentFragment
  }
}
```

### Query Variebles

Здесь будут примеры body для mutation запросов для создания данных:

```json
{
  "login": {
    "email": "admin@gmail.com",
    "password": "1"
  },
  "tag": {
    "title": "Java",
    "description": "java tasks"
  },
  "task":  {
    "title": "JavaScript Array compiler",
    "description": "Create array compiler",
    "difficulty": "EASY" ,
    "tagsIds": [1, 3],
    "result": "[compiled]"
  },
  "comment": {
    "title": "This Task is nice",
    "taskId": 5
  },
  "commentTaskId": 5
}
```

## Файлы и их назначение

- `*name*.module.ts` — определяет модуль для работы с пользователями, включая резолвер и сервис.
- `*name*.service.ts` — содержит логику для управления данными пользователей, такие как создание и получение списка пользователей.
- `*name*.resolver.ts` — резолвер, который обрабатывает GraphQL-запросы и мутации для работы с пользователями.
- `*name*.entity.ts` — определяет сущность пользователя, используемую в базе данных и в GraphQL.

## Технологии и библиотеки

- **NestJS** — фреймворк для построения серверных приложений.
- **GraphQL** — язык запросов и runtime для API.
- **TypeScript** — язык программирования, используемый для типизации и улучшения читаемости кода.

## Команды

- `yarn start` — запуск приложения в режиме production.
- `yarn dev` — запуск приложения в режиме разработки с автоматической перезагрузкой при изменении файлов.
- `yarn build` — запуск сборки проекта.
- `yarn prod` — запуск собраной версии проекта.
- `yarn test` — запуск тестов. // Пока не настроенно

## Дополнительная информация

Для дополнительной информации по работе с NestJS и GraphQL, посетите [официальную документацию NestJS](https://docs.nestjs.com/graphql/quick-start) и [GraphQL](https://graphql.org/learn/).
