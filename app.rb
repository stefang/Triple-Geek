module Nesta
  class Page
    def image
      if metadata('image')
        metadata('image')
      end      
    end
  end
  class App
    helpers do
      def index_page_for(path)
        Nesta::Page.find_by_path(path).path
      end
      def pages_in(path, limit = -1)
        Nesta::Page.find_by_path(path).pages.slice(0, limit)
      end
      def articles_in(path, limit = -1)
        Nesta::Page.find_by_path(path).articles.slice(0, limit)
      end
    end
  end
  module Navigation
    module Renderers
      def portfolio_list_for(path, count)
        haml_tag :ul do
          articles_in(path, count).each do |article|
            haml_tag :li do
              if article.image
                haml_tag :a, :href => article.abspath do
                  haml_tag :img, :src => "/attachments/#{article.image}", :alt => Sanitize.clean(article.heading), :title => Sanitize.clean(article.heading)
                  haml_tag :span, Sanitize.clean(article.heading), :class => 'heading'
                end
              end
            end
          end
        end
      end
      def article_list_for(path, count)
        haml_tag :ul do
          articles_in(path, count).each do |article|
            haml_tag :li do
              haml_tag :a, :href => article.abspath do
                haml_tag :img, :src => "/attachments/#{article.image}", :alt => Sanitize.clean(article.heading), :title => Sanitize.clean(article.heading)
                haml_tag :span, Sanitize.clean(article.heading), :class => 'heading'
              end
            end
          end
        end
      end
      def display_breadcrumbs(options = {})
        haml_tag :ul, :class => options[:class] do
          breadcrumb_ancestors[0...-1].each do |page|
            haml_tag :li do
              haml_tag :a, :<, :href => page.abspath do
                haml_concat breadcrumb_label(page)
                haml_tag(:span, :class => 'arrow')
              end
            end
          end
        end
      end
    end
  end
end
