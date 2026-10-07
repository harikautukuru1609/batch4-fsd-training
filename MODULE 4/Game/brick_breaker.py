import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Screen
WIDTH = 800
HEIGHT = 500
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Brick Breaker Game")

clock = pygame.time.Clock()

# Colors
BLACK = (20, 20, 20)
WHITE = (255, 255, 255)
RED = (220, 50, 50)
GREEN = (50, 200, 100)
BLUE = (50, 120, 220)
YELLOW = (240, 200, 50)
PURPLE = (170, 80, 200)


# Fonts
font = pygame.font.Font(None, 36)
big_font = pygame.font.Font(None, 70)

# Paddle
PADDLE_WIDTH = 120
PADDLE_HEIGHT = 15

paddle = pygame.Rect(
    WIDTH // 2 - PADDLE_WIDTH // 2,
    HEIGHT - 50,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
)

paddle_speed = 8

# Ball
BALL_SIZE = 15

ball = pygame.Rect(
    WIDTH // 2,
    HEIGHT // 2,
    BALL_SIZE,
    BALL_SIZE
)

ball_speed_x = 5
ball_speed_y = -5

# Bricks
BRICK_ROWS = 5
BRICK_COLUMNS = 10
BRICK_WIDTH = 70
BRICK_HEIGHT = 25
BRICK_GAP = 8

brick_colors = [
    RED,
    YELLOW,
    GREEN,
    BLUE,
    PURPLE
]

bricks = []


def create_bricks():
    bricks.clear()

    total_width = (
        BRICK_COLUMNS * BRICK_WIDTH
        + (BRICK_COLUMNS - 1) * BRICK_GAP
    )

    start_x = (WIDTH - total_width) // 2

    for row in range(BRICK_ROWS):
        for col in range(BRICK_COLUMNS):

            x = start_x + col * (BRICK_WIDTH + BRICK_GAP)
            y = 60 + row * (BRICK_HEIGHT + BRICK_GAP)

            brick = pygame.Rect(
                x,
                y,
                BRICK_WIDTH,
                BRICK_HEIGHT
            )

            bricks.append((brick, brick_colors[row]))


# Game variables
score = 0
lives = 3
game_over = False
game_won = False


def reset_ball():
    global ball_speed_x, ball_speed_y

    ball.center = (WIDTH // 2, HEIGHT // 2)

    ball_speed_x = random.choice([-5, 5])
    ball_speed_y = -5


def restart_game():
    global score, lives, game_over, game_won

    score = 0
    lives = 3
    game_over = False
    game_won = False

    paddle.x = WIDTH // 2 - PADDLE_WIDTH // 2

    create_bricks()
    reset_ball()


# Create bricks at the beginning
create_bricks()


# Main game loop
while True:

    # Events
    for event in pygame.event.get():

        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        if event.type == pygame.KEYDOWN:

            if event.key == pygame.K_r:
                restart_game()

            if event.key == pygame.K_ESCAPE:
                pygame.quit()
                sys.exit()

    # Game running
    if not game_over and not game_won:

        # Keyboard controls
        keys = pygame.key.get_pressed()

        if keys[pygame.K_LEFT]:
            paddle.x -= paddle_speed

        if keys[pygame.K_RIGHT]:
            paddle.x += paddle_speed

        # Keep paddle inside screen
        if paddle.left < 0:
            paddle.left = 0

        if paddle.right > WIDTH:
            paddle.right = WIDTH

        # Move ball
        ball.x += ball_speed_x
        ball.y += ball_speed_y

        # Left wall
        if ball.left <= 0:
            ball.left = 0
            ball_speed_x *= -1

        # Right wall
        if ball.right >= WIDTH:
            ball.right = WIDTH
            ball_speed_x *= -1

        # Top wall
        if ball.top <= 0:
            ball.top = 0
            ball_speed_y *= -1

        # Paddle collision
        if ball.colliderect(paddle) and ball_speed_y > 0:

            ball.bottom = paddle.top
            ball_speed_y *= -1

            # Change ball direction depending on where
            # it hits the paddle
            difference = ball.centerx - paddle.centerx
            ball_speed_x = difference // 10

            if ball_speed_x == 0:
                ball_speed_x = random.choice([-3, 3])

        # Brick collision
        brick_hit = None

        for brick, color in bricks:

            if ball.colliderect(brick):
                brick_hit = (brick, color)

                # Change vertical direction
                ball_speed_y *= -1

                break

        # Remove hit brick
        if brick_hit:

            bricks.remove(brick_hit)
            score += 10

        # Ball falls below screen
        if ball.top > HEIGHT:

            lives -= 1

            if lives <= 0:
                game_over = True
            else:
                reset_ball()

        # Check winning
        if len(bricks) == 0:
            game_won = True

    # -----------------------------
    # DRAW SCREEN
    # -----------------------------

    screen.fill(BLACK)

    # Draw bricks
    for brick, color in bricks:

        pygame.draw.rect(
            screen,
            color,
            brick
        )

        pygame.draw.rect(
            screen,
            WHITE,
            brick,
            2
        )

    # Draw paddle
    pygame.draw.rect(
        screen,
        WHITE,
        paddle
    )

    # Draw ball
    pygame.draw.ellipse(
        screen,
        WHITE,
        ball
    )

    # Score
    score_text = font.render(
        f"Score: {score}",
        True,
        WHITE
    )

    screen.blit(
        score_text,
        (20, 15)
    )

    # Lives
    lives_text = font.render(
        f"Lives: {lives}",
        True,
        WHITE
    )

    screen.blit(
        lives_text,
        (680, 15)
    )

    # Game Over
    if game_over:

        text = big_font.render(
            "GAME OVER",
            True,
            RED
        )

        screen.blit(
            text,
            (
                WIDTH // 2 - text.get_width() // 2,
                HEIGHT // 2 - 60
            )
        )

        restart_text = font.render(
            "Press R to Restart",
            True,
            WHITE
        )

        screen.blit(
            restart_text,
            (
                WIDTH // 2 - restart_text.get_width() // 2,
                HEIGHT // 2 + 20
            )
        )

    # You Win
    if game_won:

        text = big_font.render(
            "YOU WIN!",
            True,
            GREEN
        )

        screen.blit(
            text,
            (
                WIDTH // 2 - text.get_width() // 2,
                HEIGHT // 2 - 60
            )
        )

        score_text = font.render(
            f"Final Score: {score}",
            True,
            WHITE
        )

        screen.blit(
            score_text,
            (
                WIDTH // 2 - score_text.get_width() // 2,
                HEIGHT // 2 + 20
            )
        )

        restart_text = font.render(
            "Press R to Play Again",
            True,
            WHITE
        )

        screen.blit(
            restart_text,
            (
                WIDTH // 2 - restart_text.get_width() // 2,
                HEIGHT // 2 + 60
            )
        )

    # Update display
    pygame.display.flip()

    # Game speed
    clock.tick(60)