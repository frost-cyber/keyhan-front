/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    name:'داشبورد',
    url:'/admin/',
    icon:'PackageIcon',

  },
  {
    header: 'فروشگاه',
    icon: 'PackageIcon',
    i18n: 'Apps',
    items: [
      {
        name: 'محصولات',
        icon: 'ShoppingCartIcon',
        submenu: [
          {
            url: '/admin/store/products',
            name: 'لیست',
          },
          {
            url: '/admin/store/products/create',
            name: 'ایجاد',
          },
        ]
      },
      {
        name: 'برند ها',
        icon: 'ShoppingCartIcon',
        submenu: [
          {
            url: '/admin/store/brands',
            name: 'لیست',
          },
        ]
      },
      {
        name: 'ویژگی ها',
        icon: 'ShoppingCartIcon',
        submenu: [
          {
            url: '/admin/store/attributes',
            name: 'لیست',
          },
          {
            url: '/admin/store/attributes/create',
            name: 'ایجاد',
          },
        ]
      },
      {
        name: 'دسته ها',
        icon: 'ShoppingCartIcon',
        submenu: [
          {
            url: '/admin/store/categories',
            name: 'لیست',
          },
          {
            url: '/admin/store/categories/create',
            name: 'ایجاد',
          },
        ]
      },
      {
        name: 'نظرات',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/store/comments',
            name: 'لیست',
          },
        ]
      },
    ]
  },

  {
    header: 'وبلاگ',
    icon: 'FileTextIcon',
    i18n: 'Others',
    items: [
      {
        name: 'مقالات',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/article/blogs',
            name: 'لیست',
          },
          {
            url: '/admin/article/blogs/create',
            name: 'ایجاد',
          },
        ]
      },
      {
        name: 'دسته ها',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/article/categories',
            name: 'لیست',
          },
          {
            url: '/admin/article/categories/create',
            name: 'ایجاد',
          },
        ]
      },
      {
        name: 'نظرات',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/article/comments',
            name: 'لیست',
          },
        ]
      },
    ]
  },

  {
    header: 'سایت',
    icon: 'FileTextIcon',
    i18n: 'Others',
    items:[
      {
        name: 'تنظیمات',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/settings',
            name: 'عمومی',
          },
          {
            url: '/admin/settings/home',
            name: 'صفحه اصلی',
          },
        ]

      },
      {
        name:'صفحات',
        icon:'FileTextIcon',
        submenu:[
          {
            url: '/admin/pages',
            name: 'لیست',
          },
          {
            url: '/admin/pages/create',
            name: 'ایجاد',
          }
        ]
      },
      {
        name: 'فرم ها',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/forms/customizations',
            name: 'سفارشی سازی',
          },
          {
            url: '/admin/forms/advice',
            name: 'درخواست مشاوره',
          },

        ]

      },
    ],
  },


  {
    header:'کاربران',
    icon: 'FileTextIcon',
    i18n: 'Others',
    items:[
      {
        name: 'کاربران',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/users/',
            name: 'لیست',
          },
        ]
      },
      {
        name: 'ادمین',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/admins/',
            name: 'لیست',
          },
          {
            url: '/admin/admins/create',
            name: 'ایجاد',
          },
        ]
      },
      {
        name: 'نقش',
        icon: 'FileTextIcon',
        submenu: [
          {
            url: '/admin/roles/',
            name: 'لیست',
          },
          {
            url: '/admin/roles/create',
            name: 'ایجاد',
          },
        ]
      },

    ],
  }
]

