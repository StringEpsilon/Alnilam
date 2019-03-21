# Philosophy

This guide's purpose is to explain the mental model to have when using Alnilam. It's called "Dynamic Routing", which is quite different from the "Static Routing" you're probably more familiar with.

## Static Routing

If you've used Rails, Express, Ember, Angular etc. you've used static routing. In these frameworks, you declare your routes as part of your app's initialization before any rendering takes place. Let's take a look at how to configure routes in express:

```js
// Express Style routing:
app.get("/", handleIndex);
app.get("/invoices", handleInvoices);
app.get("/invoices/:id", handleInvoice);
app.get("/invoices/:id/edit", handleInvoiceEdit);

app.listen();
```

Note how the routes are declared before the app listens. The client side routers we've used are similar. In Angular you declare your routes up front and then import them to the top-level `AppModule` before rendering:

```js
// Angular Style routing:
const appRoutes: Routes = [
  {
    path: "crisis-center",
    component: CrisisListComponent
  },
  {
    path: "hero/:id",
    component: HeroDetailComponent
  },
  {
    path: "heroes",
    component: HeroListComponent,
    data: { title: "Heroes List" }
  },
  {
    path: "",
    redirectTo: "/heroes",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppModule {}
```

Ember has a conventional `routes.js` file that the build reads and
imports into the application for you. Again, this happens before
your app renders.

```js
// Ember Style Router:
Router.map(function() {
  this.route("about");
  this.route("contact");
  this.route("rentals", function() {
    this.route("show", { path: "/:rental_id" });
  });
});

export default Router;
```

Though the APIs are different, they all share the model of "static routes". 

To be successful with Alnilam, you need to forget all that! :O

## Dynamic Routing

When we say dynamic routing, we mean routing that takes place **as your app is rendering**, not in a configuration or convention outside of a running app. That means almost everything is a component in Alnilam. Here's a 60 second review of the API to see how it works:

First, grab yourself a `Router` component for the environment you're targeting and render it at the top of your app.

```jsx
// react-dom (what we'll use here)
import { BrowserRouter } from "alnilam";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```

Next, grab the link component to link to a new location:

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);
```

Finally, render a `Route` to show some UI when the user visits
`/dashboard`.

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);
```

The `Route` will render `<Dashboard {...props}/>` where `props` are some router specific things that look like `{ match, location, history }`. If the user is **not** at `/dashboard` then the `Route` will render `null`. That's pretty much all there is to it.

## Nested Routes

Lots of routers have some concept of "nested routes". But how do you "nest routes"? Well, how do you nest a `div`?

```jsx
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
);

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route path={match.url + "/carnitas"} component={Carnitas} />
  </div>
);
```

See how the router has no "nesting" API? `Route` is just a component, just like `div`. So to nest a `Route` or a `div`, you just ... do it.

Let's get trickier.

## Responsive Routes

Consider a user navigates to `/invoices`. Your app is adaptive to different screen sizes, they have a narrow viewport, and so you only show them the list of invoices and a link to the invoice dashboard. They can navigate deeper from there.

```asciidoc
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+
```

On a larger screen we'd like to show a master-detail view where the navigation is on the left and the dashboard or specific invoices show up on the right.

```asciidoc
Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

Now pause for a minute and think about the `/invoices` url for both screen sizes. Is it even a valid route for a large screen? What should we put on the right side?

```asciidoc
Large Screen
url: /invoices
+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 01      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |             ???           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 03      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

On a large screen, `/invoices` isn't a valid route, but on a small screen it is! To make things more interesting, consider somebody with a giant phone. They could be looking at `/invoices` in portrait orientation and then rotate their phone to landscape. Suddenly, we have enough room to show the master-detail UI, so you ought to redirect right then!

When routing is dynamic, however, you can declaratively compose this functionality. If you start thinking about routing as UI, not as static configuration, your intuition will lead you to the following code:

```js
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices} />
  </AppLayout>
);

const Invoices = () => (
  <Layout>
    {/* always show the nav */}
    <InvoicesNav />

    <Media query={PRETTY_SMALL}>
      {screenIsSmall =>
        screenIsSmall ? (
          // small screen has no redirect
          <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard} />
            <Route path="/invoices/:id" component={Invoice} />
          </Switch>
        ) : (
          // large screen does!
          <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard} />
            <Route path="/invoices/:id" component={Invoice} />
            <Redirect from="/invoices" to="/invoices/dashboard" />
          </Switch>
        )
      }
    </Media>
  </Layout>
);
```

As the user rotates their phone from portrait to landscape, this code will automatically redirect them to the dashboard. _The set of valid routes change depending on the dynamic nature of a mobile device in a user's hands_.
