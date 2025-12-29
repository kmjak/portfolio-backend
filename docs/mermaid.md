# Database Entity Relationship Diagram

## ER図

```mermaid
erDiagram
    Backgrounds {
        uuid id PK
        text title
        text description
        date event_date
        timestamp created_at
    }

    Achievements {
        uuid id PK
        text title
        text result
        text description
        date achieved_at
        timestamp created_at
        timestamp updated_at
    }

    AchievementCategories {
        uuid id PK
        text name UK
    }

    AchievementCategoryMaps {
        uuid achievement_id PK,FK
        uuid category_id PK,FK
    }

    Skills {
        uuid id PK
        text name
        integer level
        text description
        timestamp created_at
        timestamp updated_at
    }

    TechCategories {
        uuid id PK
        text name UK
    }

    SkillTechCategoryMaps {
        uuid skill_id PK,FK
        uuid category_id PK,FK
    }

    Projects {
        uuid id PK
        text title
        text description
        text thumbnail_url
        text repo_url
        text demo_url
        boolean is_featured
        timestamp created_at
        timestamp updated_at
    }

    ProjectSkillMaps {
        uuid project_id PK,FK
        uuid skill_id PK,FK
    }

    ProjectDetails {
        uuid project_id PK,FK
        text background
        text key_points
        text challenges
        text solutions
        timestamp created_at
        timestamp updated_at
    }

    %% リレーションシップ
    Achievements ||--o{ AchievementCategoryMaps : "achievement_id"
    AchievementCategories ||--o{ AchievementCategoryMaps : "category_id"

    Skills ||--o{ SkillTechCategoryMaps : "skill_id"
    TechCategories ||--o{ SkillTechCategoryMaps : "category_id"

    Projects ||--o{ ProjectSkillMaps : "project_id"
    Skills ||--o{ ProjectSkillMaps : "skill_id"

    Projects ||--|| ProjectDetails : "project_id"
```

## 説明

### テーブル関係

- **Achievements ←→ AchievementCategories**: 多対多の関係。AchievementCategoryMapsテーブルを中間テーブルとして使用
- **Skills ←→ TechCategories**: 多対多の関係。SkillTechCategoryMapsテーブルを中間テーブルとして使用
- **Projects ←→ Skills**: 多対多の関係。ProjectSkillMapsテーブルを中間テーブルとして使用
- **Projects → ProjectDetails**: 一対一の関係。プロジェクトの詳細情報

### 制約

- すべてのidはUUID形式
- levelは1-5の範囲でチェック制約
- name列にはUNIQUE制約
- 外部キー制約でCASCADE DELETE設定

### 独立テーブル

- **Backgrounds**: 経歴情報を格納する独立したテーブル
