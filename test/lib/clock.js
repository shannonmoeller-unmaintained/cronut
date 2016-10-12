import test from 'whim/lib/test';
import Clock from '../../lib/clock';

test('should create a clock', async t => {
	t.is(typeof Clock, 'function');
});
