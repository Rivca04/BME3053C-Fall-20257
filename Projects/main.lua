function love.load()
  love.window.setTitle("Hello from Codespaces + LÖVE")
  width, height = 800, 600
  love.window.setMode(width, height)
  msg = "It works! 🚀  Use arrow keys to move the box."
  player = { x = 100, y = 100, s = 40, v = 200 }
  -- Bouncing ball state
  ball = {
    x = width / 2,
    y = height / 2,
    r = 16,
    vx = 240, -- pixels per second
    vy = 180,
    color = {0.2, 0.6, 1.0}
  }
  ball_paused = false
end

function love.update(dt)
  if love.keyboard.isDown("d") then player.x = player.x + player.v * dt end
  if love.keyboard.isDown("a")  then player.x = player.x - player.v * dt end
  if love.keyboard.isDown("s")  then player.y = player.y + player.v * dt end
  if love.keyboard.isDown("w")    then player.y = player.y - player.v * dt end

  -- Toggle pause with P, reset ball with R
  if love.keyboard.isDown("p") then ball_paused = true end
  if love.keyboard.isDown("o") then ball_paused = false end
  if love.keyboard.isDown("r") then
    ball.x = width / 2; ball.y = height / 2; ball.vx = 240; ball.vy = 180
  end

  -- Update ball position when not paused
  if not ball_paused then
    ball.x = ball.x + ball.vx * dt
    ball.y = ball.y + ball.vy * dt

    local bounced = false
    -- Left / right
    if ball.x - ball.r <= 0 then
      ball.x = ball.r
      ball.vx = math.abs(ball.vx)
      bounced = true
    elseif ball.x + ball.r >= width then
      ball.x = width - ball.r
      ball.vx = -math.abs(ball.vx)
      bounced = true
    end

    -- Top / bottom
    if ball.y - ball.r <= 0 then
      ball.y = ball.r
      ball.vy = math.abs(ball.vy)
      bounced = true
    elseif ball.y + ball.r >= height then
      ball.y = height - ball.r
      ball.vy = -math.abs(ball.vy)
      bounced = true
    end

    -- Change color on bounce
    if bounced then
      ball.color = { math.random(), math.random(), math.random() }
    end
  end
end

function love.draw()
  love.graphics.print(msg, 20, 20)
  love.graphics.rectangle("fill", player.x, player.y, player.s, player.s)
  -- Draw bouncing ball
  love.graphics.setColor(ball.color)
  love.graphics.circle("fill", ball.x, ball.y, ball.r)
  -- reset color for UI text
  love.graphics.setColor(1,1,1)
  love.graphics.print("P: pause  O: unpause  R: reset", 20, 40)
end