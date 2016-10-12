import test from 'whim/lib/test';
import cronut from '../index';

test('should schedule a task', async t => {
	t.plan(5);

	const scheduler = cronut();
	const unschedule = scheduler(
		'*/1 * * * * *',
		() => t.pass('tick'),
	);

	return new Promise(resolve => {
		setTimeout(unschedule, 5000);
		setTimeout(resolve, 10000);
	});
});
