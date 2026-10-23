# Haven — Statamic Starter Kit

Haven is a lifestyle commerce starter kit for apparel, furniture, jewellery, and home brands. Built for Statamic 5, it keeps one visual design and swaps demo copy through a post-install industry setup.

**One Page template.** Marketing pages use Theme sections in the Control Panel. Functional templates cover product detail, shop cart, blog detail, category archive, account, and sign-in shells.

Shoppers add items to a session cart and send a cart or product inquiry. There is no card checkout or payment capture.

---

## After install — choose an industry

Starter-kit install is non-interactive. Run one command to apply a niche demo pack:

```bash
php please haven:setup apparel
# or: furniture | jewellery | home
```

This sets `Setting.industry`, replaces sample products (and matching blog titles), and refreshes the Stache. If you skip it, the default pack is **apparel**.

Register the kit provider once after install (do not replace `AppServiceProvider`):

```php
// bootstrap/providers.php
App\Providers\HavenServiceProvider::class,
```

---

## Pages

| Page | URL | Notes |
|---|---|---|
| Home | `/` | page_builder |
| Shop | `/shop` | page_builder + shop_products |
| Search | `/search` | pieces and journal notes |
| Product detail | `/products/{slug}` | `products/show` |
| Category | `/categories/{slug}` | `category` |
| Collection | `/collection` | collection grid |
| Cart | `/cart` | session cart |
| Checkout | `/checkout` | cart inquiry, no card charge |
| Blog | `/blog` | page_builder + blogs |
| Blog detail | `/blog/{slug}` | `blogs/show` |
| About | `/about` | page_builder |
| Contact | `/contact` | page_builder + contact_form |
| Account | `/account` | nonfunctional design shell — no orders, downloads, saved cards, or login |
| Accounts note | `/login` | does not register users, store passwords, or reset logins |
| Missing page | any unknown URL | error page |

---

## Theme sections (page_builder)

`home_hero`, `about_intro`, `collection_feature`, `explore_slider`, `video_feature`, `shop_products` (grid / list / sidebar), `newsletter`, `blogs` (grid / masonry / classic), `contact_form`, `heading_banner`, `legal_copy`

---

## Collections and taxonomies

- **Pages** — marketing pages with Theme sections
- **Products** — catalogue with image, price, optional option sets
- **Blogs** — journal posts
- **Categories** taxonomy — group products by industry niche

## Globals

- **Setting** — site name, industry, logo, phone, email, address, social, form button/success copy

## Navigation

- `header_menu`, `footer_menu` — edit destinations in the Control Panel

---

## Features

- Lifestyle storefront with shared jewellery-derived design (`jw_` CSS classes kept)
- Industry packs under `content/industries/{apparel,furniture,jewellery,home}/`
- Session cart with add / update / remove
- Product inquiry and cart inquiry instead of card payment
- AJAX forms via `theme-forms.js` (no `js="true"` on form tags)
- Header and footer wired to nav and Setting globals

---

## Forms (Statamic Pro)

| Form | Handle |
|---|---|
| Contact | `contact` |
| Newsletter | `newsletter` |
| Product inquiry | `product_inquiry` |
| Cart inquiry | `cart_inquiry` |

Statamic Core includes one form. Use **Statamic Pro** if you keep all four. Set each form email recipient in **CP → Forms** after install.

---

## Installation

Follow the [Starter Kit installation instructions](https://statamic.dev/starter-kits/installing-a-starter-kit).  
Requires **Statamic 5.x**.

```bash
statamic new my-site webbycrown/haven-statamic-theme

# or into an existing site
php please starter-kit:install webbycrown/haven-statamic-theme
```

Then:

```bash
# Register HavenServiceProvider (see above)
php please haven:setup apparel
php please stache:refresh
```

This kit does not export `routes/`. Your `routes/web.php` stays as it is. `HavenServiceProvider` registers `/search`, `/cart`, `/checkout`, `/categories/{slug}`, and the cart add, update, and remove posts.

Optional HTML redirects, only if old template filenames still get traffic. New Statamic sites do not need these. Add them to your own `routes/web.php`:

```php
Route::redirect('/index.html', '/');
Route::redirect('/shop.html', '/shop');
Route::redirect('/single-product.html', '/shop');
Route::redirect('/about.html', '/about');
Route::redirect('/contact.html', '/contact');
Route::redirect('/blog.html', '/blog');
Route::redirect('/blog-detail.html', '/blog');
Route::redirect('/cart.html', '/cart');
Route::redirect('/checkout.html', '/checkout');
Route::redirect('/login.html', '/login');
Route::redirect('/account-page.html', '/account');
Route::redirect('/error.html', '/');
```

---

## Third-party libraries

See [THIRD_PARTY.md](THIRD_PARTY.md) for bundled front-end libraries and licences.

---

## Credit

Theme by [WebbyCrown](https://webbycrown.com).
