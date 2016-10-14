import test from 'whim/lib/test';
import cronut from '../index';

test('should schedule a task', async t => {
	let count = 0;

	const cron = cronut();
	const removeTask = cron('*/1 * * * * *', () => {
		t.pass('tick');
		count += 1;
	});

	return new Promise(resolve => {
		setTimeout(removeTask, 5000);

		setTimeout(() => {
			t.ok(count >= 4 && count <= 6);
			resolve();
		}, 10000);
	});
});
