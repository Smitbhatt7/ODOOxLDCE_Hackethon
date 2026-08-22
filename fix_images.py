import re

cities_map = {
  'c1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques_Paris_ao%C3%BBt_2014_%282%29.jpg/800px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques_Paris_ao%C3%BBt_2014_%282%29.jpg',
  'c2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/800px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
  'c3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Rome_Montage_2017.png/800px-Rome_Montage_2017.png',
  'c4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Barcelona_collage.JPG/800px-Barcelona_collage.JPG',
  'c5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg',
  'c6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kyoto%2C_Japan_%2849667780482%29.jpg/800px-Kyoto%2C_Japan_%2849667780482%29.jpg',
  'c7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pura_Ulun_Danu_Bratan%2C_2022.jpg/800px-Pura_Ulun_Danu_Bratan%2C_2022.jpg'
}

activities_map = {
  'a1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
  'a2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/800px-Louvre_Museum_Wikimedia_Commons.jpg',
  'a3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Bercy%2C_Paris_01.jpg/800px-Bercy%2C_Paris_01.jpg',
  'a4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Brooklyn_Museum_-_Monk_Testing_Wine_-_Antonio_Casanova_y_Estorach.jpg/800px-Brooklyn_Museum_-_Monk_Testing_Wine_-_Antonio_Casanova_y_Estorach.jpg',
  'a5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Van_Gogh_Museum_Amsterdam.jpg/800px-Van_Gogh_Museum_Amsterdam.jpg',
  'a6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/800px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
  'a7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/800px-Colosseo_2020.jpg',
  'a8': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Vatican_Museums_Spiral_Staircase_2012.jpg/800px-Vatican_Museums_Spiral_Staircase_2012.jpg',
  'a9': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Macaca_fascicularis_-_Ubud_Monkey_Forest_2.jpg/800px-Macaca_fascicularis_-_Ubud_Monkey_Forest_2.jpg',
  'a10': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mavericks_Surf_Contest_2010b.jpg/800px-Mavericks_Surf_Contest_2010b.jpg',
  'a11': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Shibuya_Crossing%2C_Tokyo%2C_Japan_%2843460670072%29.jpg/800px-Shibuya_Crossing%2C_Tokyo%2C_Japan_%2843460670072%29.jpg',
  'a12': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tsukiji_Fish_Market_2.jpg/800px-Tsukiji_Fish_Market_2.jpg'
}

with open('src/data/cities.js', 'r') as f:
    cities_content = f.read()

for k, v in cities_map.items():
    cities_content = re.sub(r'(id:\s*[\'\"]' + k + r'[\'\"].*?image:\s*[\'\"]).*?([\'\"])', r'\g<1>' + v + r'\2', cities_content, flags=re.DOTALL)

with open('src/data/cities.js', 'w') as f:
    f.write(cities_content)

with open('src/data/activities.js', 'r') as f:
    activities_content = f.read()

for k, v in activities_map.items():
    activities_content = re.sub(r'(id:\s*[\'\"]' + k + r'[\'\"].*?image:\s*[\'\"]).*?([\'\"])', r'\g<1>' + v + r'\2', activities_content, flags=re.DOTALL)

with open('src/data/activities.js', 'w') as f:
    f.write(activities_content)
