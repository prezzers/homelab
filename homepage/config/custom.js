// tmux-style status bar, like CoreDump's window bar.
// Lists each service group as a "window" (click to jump), plus host and clock.
(function () {
  function build() {
    if (document.getElementById('lab-bar')) return;
    const headings = Array.from(
      document.querySelectorAll('.service-group-name, .services-group h2, .bookmark-group-name')
    );
    const bar = document.createElement('div');
    bar.id = 'lab-bar';

    const brand = document.createElement('div');
    brand.className = 'brand';
    brand.textContent = '■ homelab';
    bar.appendChild(brand);

    const list = document.createElement('div');
    list.className = 'list';
    headings.forEach((h, i) => {
      const w = document.createElement('div');
      w.className = 'win';
      const name = (h.textContent || '').trim().toLowerCase();
      w.innerHTML = '<span class="key">' + i + ':</span><span>' + name + '</span>';
      w.addEventListener('click', () => h.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      list.appendChild(w);
    });
    bar.appendChild(list);

    const right = document.createElement('div');
    right.className = 'right';
    right.innerHTML = '<span>pve · 192.168.0.200</span><span class="clock"></span>';
    bar.appendChild(right);
    document.body.appendChild(bar);

    const clock = right.querySelector('.clock');
    const tick = () => {
      const d = new Date();
      clock.textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) +
        ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };
    tick();
    setInterval(tick, 15000);
  }
  // Homepage renders client-side; wait until the groups exist.
  const start = Date.now();
  const wait = setInterval(() => {
    if (document.querySelector('.service-group-name, .services-group h2') || Date.now() - start > 8000) {
      clearInterval(wait);
      build();
    }
  }, 250);
})();
