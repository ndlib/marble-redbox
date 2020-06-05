export const dummyDirectories = [
  {
    path: 'path/1',
    items: [
      {
        path: 'path/1/image123',
        name: 'image123.jpg',
        type: 'image',
      },
      {
        path: 'path/1/image456',
        name: 'image456.gif',
        type: 'image',
      },
    ],
    folders: [
      {
        path: 'path/1/child',
        items: [],
      },
    ],
  },
  {
    path: 'longer/path/to/a/place/2',
    folders: [
      {
        path: 'longer/path/to/a/place/2/child',
        items: [
          {
            path: 'longer/path/to/a/place/2/child/nestedImage',
            name: 'nestedImage.jpg',
            type: 'image',
          },
          {
            path: 'longer/path/to/a/place/2/child/someFile',
            name: 'someFile.pdf',
            type: 'pdf',
          },
        ],
      },
      {
        path: 'longer/path/to/a/place/2/child2',
        items: [
          {
            path: 'longer/path/to/a/place/2/child2/yetAnotherImage',
            name: 'yetAnotherImage.jpg',
            type: 'image',
          },
        ],
      },
    ],
  },
]
