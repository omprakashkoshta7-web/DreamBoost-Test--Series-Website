import { Star } from '@shared/icons';

export const TestimonialsSection = () => (
  <section id="testimonials" className="py-16 sm:py-20 bg-white border-t border-tb-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 text-tb-blue text-xs font-bold rounded-full uppercase tracking-wider mb-3">Testimonials</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-tb-navy">Student Success Stories</h2>
        <p className="text-sm text-tb-gray-500 mt-2 max-w-md mx-auto">Hear from students who cracked their exams</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Rahul Sharma', exam: 'SSC CGL 2025', score: 'AIR 42', text: 'DreamBoost test series helped me score 180+ in Tier I. The analysis feature is amazing!' },
          { name: 'Priya Singh', exam: 'IBPS PO 2025', score: 'Selected', text: 'The mock tests were exactly like the actual exam. I felt very confident on exam day.' },
          { name: 'Amit Kumar', exam: 'RRB NTPC 2025', score: 'AIR 156', text: 'Best platform for railway exam preparation. Previous year papers were very helpful.' },
        ].map((testimonial, i) => (
          <div key={i} className="card p-6 group hover:shadow-tb-md transition-all duration-300">
            <div className="flex items-center gap-1 mb-4">{[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
            <p className="text-sm text-tb-gray-600 leading-relaxed mb-5">"{testimonial.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-tb-gray-100">
              <div className="w-10 h-10 bg-gradient-to-br from-tb-blue to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {testimonial.name.split(' ').map((name) => name[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-tb-navy">{testimonial.name}</p>
                <p className="text-xs text-tb-green font-medium">{testimonial.exam} - {testimonial.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
