insert into movies (
  title,
  year,
  genre,
  description,
  poster_url,
  youtube_trailer_id,
  platform,
  role,
  is_featured
)
values
  ('Dapo Tori Ti E', 2000, 'Drama', null, null, null, 'YouTube', array['Actor'], false),
  ('Oro Abere', 2005, 'Drama', null, null, null, 'YouTube', array['Actor'], false),
  ('Itele', 2004, 'Action', null, null, null, 'YouTube', array['Actor', 'Producer'], false),
  ('Ekun Meta', 2006, 'Action', null, null, null, 'YouTube', array['Actor', 'Producer'], false),
  ('Kesari', 2018, 'Action', null, null, null, 'YouTube', array['Actor', 'Producer'], true),
  ('Lucifer', 2019, 'Drama', 'BON Award Best Actor in Lead Role 2020', null, null, 'YouTube', array['Actor'], true),
  ('Return of Kesari', 2019, 'Action', 'Itele''s signature work - wrote, directed, and produced', null, null, 'YouTube', array['Actor', 'Director', 'Producer', 'Writer'], true),
  ('Anini', null, 'Action', null, null, null, 'YouTube', array['Actor', 'Writer'], false),
  ('Akoba', null, 'Action', null, null, null, 'YouTube', array['Actor', 'Writer'], false),
  ('President Kuti', 2021, 'Drama', null, null, null, 'YouTube', array['Director', 'Producer'], false),
  ('Oba Bi Olorun', 2021, 'Drama', null, null, null, 'YouTube', array['Actor'], false),
  ('Romeo', 2022, 'Drama', null, null, null, 'YouTube', array['Actor', 'Director'], false),
  ('Jagun Jagun', 2023, 'Epic/Action', 'Netflix Yoruba epic - Itele plays Gbogunmi', null, 'WU6MwBs3mzs', 'Netflix', array['Actor'], true),
  ('Késárí: The King', 2023, 'Action', 'Continuation of the Kesari franchise', null, 'SSzqdOJ5ZfQ', 'YouTube', array['Actor', 'Producer'], true),
  ('Father Abraham', 2023, 'Drama', null, null, null, 'YouTube', array['Actor'], false),
  ('World Famous', 2023, 'Drama', null, null, null, 'YouTube', array['Actor'], false),
  ('Dolapo Douglas', 2024, 'Drama', null, null, null, 'YouTube', array['Actor', 'Director'], false),
  ('A Tribe Called Judah', 2024, 'Action', null, null, null, 'YouTube', array['Actor'], false),
  ('For My Area', 2024, 'Action', null, null, null, 'YouTube', array['Actor', 'Director'], false),
  ('Lisabi: The Uprising', 2024, 'Historical', null, null, null, 'Netflix', array['Actor'], false),
  ('Koleoso', 2025, 'Supernatural/Drama', '#1 Most Searched Nigerian Series - Google Year in Search 2025. 10+ parts, Iteledicon Studio YouTube.', null, 'tWRZyt1tsas', 'YouTube', array['Actor', 'Director', 'Producer'], true),
  ('Apaara: The Outcast', 2025, 'Action', null, null, null, 'YouTube', array['Actor'], false),
  ('Iyawo Alhaji', 2025, 'Comedy', null, null, null, 'YouTube', array['Actor'], false);

insert into alumni (
  full_name,
  stage_name,
  avatar_url,
  bio,
  graduation_year,
  "current_role",
  social_instagram,
  is_featured
)
values
  (
    'Ariyo Oluwakemisola Apesin',
    'Kemity',
    null,
    'Kemity is Itele D''Icon''s first and most celebrated student. She served as his apprentice for 8-10 years, supporting him through his toughest times. She is now a successful Yoruba Nollywood actress in her own right and has founded her own institution - Kemity School of Performing Film Arts - continuing the legacy of D''Icon School into the next generation. In 2025 she starred in the record-breaking Koleoso series.',
    null,
    'Actress, Filmmaker, School Founder',
    '@kemity',
    true
  ),
  (
    'Saliu Gbolagade',
    'Ogboluke',
    null,
    'A veteran Yoruba Nollywood actor and director whose decades of industry experience found new heights in 2025. His role in Itele''s Koleoso series earned him the prestigious Legendary Award and Outstanding Performance recognition at the OAFP Awards 2025 in Abeokuta, where he also received a N1.5 million naira cash gift from the industry in tribute.',
    null,
    'Actor, Director',
    '@ogboluke',
    true
  ),
  (
    'Omo T''olani Odobodo',
    'Omo T''olani',
    null,
    'A talented Yoruba Nollywood actress who trained under Ibrahim Yekini (Itele D''Icon) at D''Icon School of Performing Arts. She has gone on to build an active career in Yoruba cinema, appearing in multiple productions.',
    null,
    'Actress',
    null,
    false
  ),
  (
    'Niyi B. Baker',
    'Niyi Baker',
    null,
    'Niyi B. Baker is a Yoruba Nollywood actor who trained at D''Icon School of Performing Arts under Ibrahim Yekini (Itele D''Icon). He has appeared in several Yoruba film productions, continuing to grow his craft in the industry.',
    null,
    'Actor',
    null,
    false
  ),
  (
    'Akinfolarin Olamide',
    'Efun',
    null,
    'Akinfolarin Olamide, known on screen as Efun, is one of the breakout stars of the Koleoso (2025) franchise. He plays one of Koleoso''s siblings in the supernatural epic, bringing fierce energy to the wizard family saga that became #1 Most Searched Nigerian Series on Google 2025.',
    null,
    'Actor',
    null,
    true
  );

insert into alumni_movies (
  alumni_id,
  movie_title,
  year,
  poster_url,
  youtube_trailer_id,
  role
)
select alumni.id, films.movie_title, films.year, films.poster_url, films.youtube_trailer_id, films.role
from alumni
join (
  values
    ('Kemity', 'Koleoso', 2025, null, 'tWRZyt1tsas', 'Actress'),
    ('Kemity', 'General Kesari / Koleoso', 2025, null, 'fPwh56bMVaI', 'Actress'),
    ('Kemity', 'Koleoso Part 2', 2025, null, 'ykoeiZQHvKw', 'Actress'),
    ('Kemity', 'Koleoso Part 3', 2025, null, 'fBRwXSOlwwc', 'Actress'),
    ('Kemity', 'Ija Ninu Ghetto', 2025, null, 'p4JRAAUvusc', 'Actress'),
    ('Ogboluke', 'Koleoso', 2025, null, 'tWRZyt1tsas', 'Actor/Director'),
    ('Ogboluke', 'Koleoso Part 7 Season 2', 2025, null, 'xjmvSvJTGG4', 'Actor'),
    ('Efun', 'Koleoso', 2025, null, 'tWRZyt1tsas', 'Actor'),
    ('Efun', 'Koleoso Part 7 Season 2', 2025, null, 'xjmvSvJTGG4', 'Actor'),
    ('Efun', 'Koleoso Part 9 Season 2', 2025, null, 'XxEt73TflBA', 'Actor')
) as films(stage_name, movie_title, year, poster_url, youtube_trailer_id, role)
  on films.stage_name = alumni.stage_name;

insert into site_settings (key, value)
values
  ('school_name', 'D''Icon School of Performing Arts'),
  ('school_tagline', 'Where Talent Becomes Legacy'),
  ('school_instagram', '@dicon_schoolofpfa'),
  ('owner_name', 'Ibrahim Yekini (Itele D''Icon)'),
  ('owner_instagram', '@iteledicon01'),
  ('contact_email', 'info@diconschool.com'),
  ('admissions_open', 'true'),
  ('hero_cta_primary', 'Explore the School'),
  ('hero_cta_secondary', 'Watch Trailer'),
  ('youtube_channel', 'Iteledicon Studio');