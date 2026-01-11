<h1 align="center">SU-API</h1>
<p>An API to retrieve data on characters, gems, fusions, and other categories from the Cartoon Network series Steven Universe.</p>
<h1 align="center">Endpoints</h2>
<h3>Character</h3>
<ul>
  <li>Returns all characters: <pre><code>GET /character</code></pre></li>
  <li>Returns searched characters: <pre><code>GET /character/[Search]</code></pre></li>
</ul>

<h3>Fusion</h3>
<ul>
  <li>Returns all fusions: <pre><code>GET /fusion</code></pre></li>
  <li>Returns searched fusions: <pre><code>GET /fusion/[Search]</code></pre></li>
</ul>
<h3>Weapon</h3>
<ul>
  <li>Returns all weapons: <pre><code>GET /weapon</code></pre></li>
  <li>Returns searched weapons: <pre><code>GET /weapon/[Search]</code></pre></li>
</ul>
<h3>Type</h3>
<ul>
  <li>Returns all types: <pre><code>GET /type</code></pre></li>
  <li>Returns searched types: <pre><code>GET /type/[Search]</code></pre></li>
</ul>
<h1 align="center">Run API</h1>
<h3>Required: </h3>
<ul>
  <li><a href="https://nodejs.org/en">NodeJS</a></li>
  <li><a href="https://docs.nestjs.com/first-steps">NestJS CLI</a></li>
  <li><a href="https://classic.yarnpkg.com/lang/en/docs/install">Yarn</a></li>
  
</ul>
<h3>Install dependencies: </h3>
<pre><code>yarn install</code></pre>
<h3>Create a .env file and fill in the variables: </h3>
<pre><code>DATABASE_URL=""</code></pre>
<h3>Push DB: </h3>
<pre><code>yarn prisma db push</code></pre>
<h3>Run API: </h3>
<pre><code>yarn start</code></pre>
