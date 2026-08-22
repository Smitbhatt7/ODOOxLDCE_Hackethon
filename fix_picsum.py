import re

cities_map = {
  'c1': 'https://picsum.photos/id/1015/800/600',
  'c2': 'https://picsum.photos/id/1016/800/600',
  'c3': 'https://picsum.photos/id/1018/800/600',
  'c4': 'https://picsum.photos/id/1019/800/600',
  'c5': 'https://picsum.photos/id/1020/800/600',
  'c6': 'https://picsum.photos/id/1021/800/600',
  'c7': 'https://picsum.photos/id/1022/800/600'
}

activities_map = {
  'a1': 'https://picsum.photos/id/1023/800/600',
  'a2': 'https://picsum.photos/id/1024/800/600',
  'a3': 'https://picsum.photos/id/1025/800/600',
  'a4': 'https://picsum.photos/id/1026/800/600',
  'a5': 'https://picsum.photos/id/1027/800/600',
  'a6': 'https://picsum.photos/id/1028/800/600',
  'a7': 'https://picsum.photos/id/1029/800/600',
  'a8': 'https://picsum.photos/id/1031/800/600',
  'a9': 'https://picsum.photos/id/1032/800/600',
  'a10': 'https://picsum.photos/id/1033/800/600',
  'a11': 'https://picsum.photos/id/1035/800/600',
  'a12': 'https://picsum.photos/id/1036/800/600'
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
