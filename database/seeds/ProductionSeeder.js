'use strict'

/*
|--------------------------------------------------------------------------
| ProductionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Achievement = use('App/Models/Achievement')
const AchievementStep = use('App/Models/AchievementStep')
const AchievementType = use('App/Models/AchievementType')
const Factory = use('Factory')

const achievementData = { hot: true, code: 'movie', name: 'Кино', description: null, image: '/images/tasks/movie-banner.jpg', reward: 320 }
const achievementStepsData = [
  {
    name: 'Войди в мир сериалов',
    description: 'Практика показывает, что просмотр сериалов - самый частое времяпровождение для семейного ужина на праздники. Поэтому Партия Еды приглашает своих клиентов принять участие в увлекательном путешествии по миру сериалов, полному сильных женских персонажей. Для начала - авторизуйтесь в приложении через ВКонтакте, чтобы принять участие в конкурсе. ',
    type: 'vk_auth',
    image: '/images/tasks/1.png',
    animation: '/images/tasks/1.gif',
    reward: 10
  },
  {
    name: 'Угадай героинь любимых сериалов',
    description: ' Узнаете всех героинь популярных сериалов?',
    type: 'other',
    image: '/images/tasks/2.png',
    animation: '/images/tasks/2.gif',
    reward: 40
  },
  {
    name: 'Поделись знаниями с друзьями',
    description: 'Расскажите о своих приключениях в мире сериалов вашим друзьям в социальной сети ВКонтакте, чтобы они тоже могли присоединиться к нашему конкурсу',
    type: 'vk_repost',
    image: '/images/tasks/3.png',
    animation: '/images/tasks/3.gif',
    vk_post_id: '',
    reward: 20
  },
  {
    name: 'Собери свой уникальный рецепт',
    description: null,
    type: 'other',
    image: '/images/tasks/4.png',
    animation: '/images/tasks/4.gif',
    vk_post_id: '1053923',
    reward: 15
  },
  {
    name: 'Подпишись на сообщество',
    description: 'Наша компания построена на открытом общении с клиентами, поэтому мы всегда ищем способы взаимодействия с нашей аудиторией. Поэтому мы и запустили программу лояльности в приложении, частью которой вы стали. Но это не значит, что в наших социальных сетях больше не будет ничего интересного! Там мы постоянно рассказываем о наших нововведениях и мероприятиях. Самое время подписаться и получить немного баллов!',
    type: 'vk_subscription',
    image: '/images/tasks/5.png',
    animation: '/images/tasks/5.gif',
    vk_owner_id: '-20629724',
    reward: 10
  },
  {
    name: 'Пригласи друга',
    description: null,
    type: 'other',
    image: '/images/tasks/6.png',
    animation: '/images/tasks/6.gif',
    reward: 50
  }
]
const achievementsData = [
  { name: 'Авторизуйся через ВК', image: '/images/tasks/1-small.png', reward: 10 },
  { name: '50 ужинов от партии еды', image: '/images/tasks/2-small.png', reward: 300 },
  { name: 'Пригласи друга', image: '/images/tasks/3-small.png', reward: 150 },
  { name: 'Прими участие в матерклассе', image: '/images/tasks/4-small.png', reward: 90 },
  { name: 'Собери свое меню', image: '/images/tasks/5-small.png', reward: 150 },
  { name: 'Модифиатор к ужину', image: '/images/tasks/6-small.png', reward: 90 }
]

class ProductionSeeder {
  async run () {
    const achievement = await Achievement.create(achievementData)

    for (let i = 0; i < achievementStepsData.length; i++) {
      const code = achievementStepsData[i].type
      delete achievementStepsData[i].type
      const step = new AchievementStep()
      step.fill(achievementStepsData[i])
      const type = await AchievementType.findBy('code', code)
      await step.achievement().associate(achievement)
      await step.achievementType().associate(type)
      await step.save()
    }

    for (let i = 0; i < achievementsData.length; i++) {
      const achievement = new Achievement()
      achievement.fill(achievementsData[i]);
      await achievement.save()
    }
  }
}

module.exports = ProductionSeeder
