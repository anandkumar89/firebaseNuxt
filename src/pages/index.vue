<template>
  <div class="page-index">
    <div class="container">
      <BlogSection :blogs="blogs"/>
    </div>
  </div>
</template>

<script>
  import BlogSection from "~/components/Sections/BlogSection"

  import blogsList from '~/contents/blogsList.js'
    
  export default {

    async asyncData ({app}) {

      const blogs = blogsList

      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/blog/${blogName}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogs.map(blog => asyncImport(blog)))
      .then((res) => 
        { 
          return {
          blogs: res
        }
      })
    },
    
    components: { BlogSection },

    transition: {
      name: 'slide-fade'
    },

    head () {
      return {
        title: this.title,
        meta: [
          { name: "author", content: "Marina Aisa" },
          { name: "description", property: "og:description", content: this.description, hid: "description" },
          { property: "og:title", content: "eigenspace.ml" },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.description },
          { name: "twitter:image", content: this.ogImage }
        ]
      };
    },

    computed: {
      ogImage: function () {
        return;
      },
      description: function () {
        return 'Through personal and professional journey of an engineer, researcher, hobbyist photographer and chef';
      },
      title: function() {
        return "eigenspace.ml";
      }
    }
  }
</script>
