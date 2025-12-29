# Database Schema

## 前提条件

- データベース: PostgreSQL
- idにはデータベース側で生成せずにバックエンド側でUUIDを生成して設定する

## Tables

### Backgrounds

- **id**: UUID PRIMARY KEY
- **title**: TEXT NOT NULL
- **description**: TEXT
- **event_date**: DATE NOT NULL
- **created_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### Achievements

- **id**: UUID PRIMARY KEY
- **title**: TEXT NOT NULL
- **result**: TEXT NOT NULL
- **description**: TEXT
- **achieved_at**: DATE NOT NULL
- **created_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- **updated_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### AchievementCategories

- **id** : UUID PRIMARY KEY
- **name** : TEXT UNIQUE NOT NULL

### AchievementCategoryMaps

- **achievement_id**: UUID REFERENCES Achievements(id) ON DELETE CASCADE
- **category_id**: UUID REFERENCES AchievementCategories(id) ON DELETE CASCADE
- **(achievement_id, category_id)**: PRIMARY KEY

### Skills

- **id**: UUID PRIMARY KEY
- **name**: TEXT NOT NULL
- **level**: INTEGER NOT NULL CHECK (level >= 1 AND level <= 5)
- **description**: TEXT
- **created_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- **updated_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### TechCategories

- **id** : UUID PRIMARY KEY
- **name** : TEXT UNIQUE NOT NULL

### SkillTechCategoryMaps

- **skill_id**: UUID REFERENCES Skills(id) ON DELETE CASCADE
- **category_id**: UUID REFERENCES TechCategories(id) ON DELETE CASCADE
- **(skill_id, category_id)**: PRIMARY KEY

### Projects

- **id**: UUID PRIMARY KEY
- **title**: TEXT NOT NULL
- **description**: TEXT NOT NULL
- **thumbnail_url**: TEXT
- **repo_url**: TEXT
- **demo_url**: TEXT
- **is_featured**: BOOLEAN NOT NULL DEFAULT FALSE
- **created_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- **updated_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### ProjectSkillMaps

- **project_id**: UUID REFERENCES Projects(id) ON DELETE CASCADE
- **skill_id**: UUID REFERENCES Skills(id) ON DELETE CASCADE
- **(project_id, skill_id)**: PRIMARY KEY

### ProjectDetails

- **project_id**: UUID REFERENCES Projects(id) ON DELETE CASCADE PRIMARY KEY
- **background**: TEXT NOT NULL
- **key_points**: TEXT NOT NULL
- **challenges**: TEXT NOT NULL
- **solutions**: TEXT NOT NULL
- **created_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- **updated_at**: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
