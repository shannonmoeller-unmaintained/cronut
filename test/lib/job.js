import test from 'whim/lib/test';
import Job from '../../lib/job';

test('should create a job', async t => {
	t.is(typeof Job, 'function');
});
