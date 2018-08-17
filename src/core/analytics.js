/* eslint-disable */

const skipEnvs = ['development', 'test'];

if (skipEnvs.indexOf(process.env.NODE_ENV) === -1) {
  (function(f, a, t, h, o, m){
    a[h]=a[h]||function(){
      (a[h].q=a[h].q||[]).push(arguments)
    };
    o=f.createElement('script'),
      m=f.getElementsByTagName('script')[0];
    o.async=1; o.src=t; o.id='fathom-script';
    m.parentNode.insertBefore(o,m)
  })(document, window, '//thyme.usesfathom.com/tracker.js', 'fathom');

  fathom('trackPageview');
}
