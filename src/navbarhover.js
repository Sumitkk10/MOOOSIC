const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = 'green';
  });

  link.addEventListener('mouseout', () => {
    link.style.color = '';
  });
});
